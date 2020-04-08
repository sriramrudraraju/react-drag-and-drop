import React, { FC, useCallback } from "react";
import { DragDropContext, DropResult, DraggableLocation } from "react-beautiful-dnd";

import { DragabbleColumn } from  './dragabble-column/dragabble-column.component';
import { Item } from './dragabble-item/draggable-item.component';

import { reorder } from './utils/reorder';

/**
 * Moves an item from one list to another list.
 */
const move = (source: Item[], destination: Item[], droppableSource: DraggableLocation, droppableDestination: DraggableLocation) => {
  const sourceClone = Array.from(source);
  const destClone = Array.from(destination);
  const [removed] = sourceClone.splice(droppableSource.index, 1);

  destClone.splice(droppableDestination.index, 0, removed);

  const result: any = {};
  result[droppableSource.droppableId] = sourceClone;
  result[droppableDestination.droppableId] = destClone;

  return result;
};


export interface Column {
  [key: string]: { items: Item[]; style?: object; }
}

interface DragAndDropProps {
  columns: Column;
  onColumnsUpdate: (obj: Column) => void;
}

export const DragAndDrop: FC<DragAndDropProps> = ({columns, onColumnsUpdate}) => {

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
            columns[source.droppableId].items,
            source.index,
            destination.index
        );
  
        // update source column list state
        onColumnsUpdate({
          ...columns,
          [source.droppableId]: {
            ...columns[source.droppableId],
            items: reorderedList
          }
        });
      } else {
          // get the updated source and destination lists
          const result = move(
              columns[source.droppableId].items,
              columns[destination.droppableId].items,
              source,
              destination
          );
    
          onColumnsUpdate({
              ...columns,
              [source.droppableId]: {
                ...columns[source.droppableId],
                items: result[source.droppableId]
              },
              [destination.droppableId]: {
                ...columns[destination.droppableId],
                items: result[destination.droppableId]
              }
          });
        }
      },
    [columns, onColumnsUpdate]
  );

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      {
        Object.keys(columns).map((key) => (
          <DragabbleColumn
            key={key} 
            droppableId={key}
            items={columns[key].items}
            style={columns[key].style}
          />
        ))
      }
    </DragDropContext>
  );
}
