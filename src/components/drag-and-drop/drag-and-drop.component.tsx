import React, { FC, useState, useCallback } from "react";
import { DragDropContext, DropResult, DraggableLocation } from "react-beautiful-dnd";

import { DragabbleColumn } from  './dragabble-column/dragabble-column.component';
import { Element } from './dragabble-cell/draggable-cell.component';

import { reorder } from './utils/reorder';

/**
 * Moves an item from one list to another list.
 */
const move = (source: Element[], destination: Element[], droppableSource: DraggableLocation, droppableDestination: DraggableLocation) => {
  const sourceClone = Array.from(source);
  const destClone = Array.from(destination);
  const [removed] = sourceClone.splice(droppableSource.index, 1);

  destClone.splice(droppableDestination.index, 0, removed);

  const result: any = {};
  result[droppableSource.droppableId] = sourceClone;
  result[droppableDestination.droppableId] = destClone;

  return result;
};

interface DragAndDropProps {
  columns: {[key: string] : {list: Element[]; style?: object}};
}

export const DragAndDrop: FC<DragAndDropProps> = ({columns}) => {
  const [state, setState] = useState(columns);

  const onDragEnd = useCallback(
    (result: DropResult) => {
      const { source, destination } = result;
  
      // dropped outside the list
      if (!destination) {
        return;
      }
  
      // if within same column
      if (source.droppableId === destination.droppableId) {
        // reorder them
        const reorderedList = reorder(
            state[source.droppableId].list,
            source.index,
            destination.index
        );
  
        // update source column list state
        setState({
          ...state,
          [source.droppableId]: {
            ...state[source.droppableId],
            list: reorderedList
          }
        });
      } else {
          // get the updated source and destination lists
          const result = move(
              state[source.droppableId].list,
              state[destination.droppableId].list,
              source,
              destination
          );
    
          setState({
              ...state,
              [source.droppableId]: {
                ...state[source.droppableId],
                list: result[source.droppableId]
              },
              [destination.droppableId]: {
                ...state[destination.droppableId],
                list: result[destination.droppableId]
              }
          });
        }
      },
    [state]
  );

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      {
        Object.keys(state).map((key) => (
          <DragabbleColumn
            key={key} 
            droppableId={key}
            list={state[key].list}
            style={state[key].style}
          />
        ))
      }
    </DragDropContext>
  );
}
