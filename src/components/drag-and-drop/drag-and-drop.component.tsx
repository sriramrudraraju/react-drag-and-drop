import React, { useState } from "react";
import { DragDropContext, DropResult, DraggableLocation } from "react-beautiful-dnd";

import { DragabbleColumn } from  './dragabble-column/dragabble-column.component';
import { Element } from './dragabble-cell/draggable-cell.component';

import { reorder } from './utils/reorder';

/**
 * Moves an item from one list to another list.
 */
const move = <T extends Element>(source: T[], destination: T[], droppableSource: DraggableLocation, droppableDestination: DraggableLocation) => {
  const sourceClone = Array.from(source);
  const destClone = Array.from(destination);
  const [removed] = sourceClone.splice(droppableSource.index, 1);

  destClone.splice(droppableDestination.index, 0, removed);

  const result: any = {};
  result[droppableSource.droppableId] = sourceClone;
  result[droppableDestination.droppableId] = destClone;

  return result;
};

interface DragAndDropProps<T> {
  columns: {[key: string]: T[]};
  dropabbleIds: string[];
}

export const DragAndDrop = <T extends Element>({columns, dropabbleIds}: DragAndDropProps<T>) => {
  const [state, setState] = useState(columns);

  function onDragEnd(result: DropResult) {
    const { source, destination } = result;

    // dropped outside the list
    if (!destination) {
      return;
    }

    // TODO: need to check if source and destinations id exists in state

    // if within same column
    if (source.droppableId === destination.droppableId) {
      // reorder them
      const items = reorder(
          state[source.droppableId],
          source.index,
          destination.index
      );

      setState({
        ...state,
        [source.droppableId]: items
      });
  } else {
      const result = move(
          state[source.droppableId],
          state[destination.droppableId],
          source,
          destination
      );

      setState({
          ...state,
          ...result
      });
  }
  }

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      {
        dropabbleIds.map((col) => (
          <DragabbleColumn
            key={col} 
            droppableId={col}
            list={state[col]}
          />
        ))
      }
    </DragDropContext>
  );
}
