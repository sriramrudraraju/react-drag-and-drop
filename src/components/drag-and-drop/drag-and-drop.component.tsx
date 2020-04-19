import React, { FC, useCallback } from 'react';
import { DragDropContext, DropResult, DraggableLocation } from 'react-beautiful-dnd';

import { DragabbleColumn, Column } from './dragabble-column/dragabble-column.component';
import { ItemMap } from './dragabble-item/dragabble-item.component';

import { reorder } from './utils/reorder';


const columnIndex = (cols: Column[], name: string) => {
  let x = -1;
  cols.forEach((col, i) => {
    if (col.name === name) {
      x = i;
    }
  })
  return x;
}

interface DragAndDropProps {
  columns: Column[];
  itemsMap: {[key: number]: ItemMap};
  onColumnsUpdate: (cols: Column[], dropResult?: DropResult) => void;
  isDragDisabled?: boolean;
}

export const DragAndDrop: FC<DragAndDropProps> = React.memo(
  ({columns, onColumnsUpdate, isDragDisabled, itemsMap}) => {
    /**
     * Moves an item from one list to another list.
     */
    const move = useCallback(
      (sourceColumn: Column, destinationColumn: Column, droppableSource: DraggableLocation, droppableDestination: DraggableLocation) => {
        const sourceItemsClone = Array.from(sourceColumn.items);
        const destItemsClone = Array.from(destinationColumn.items);
  
        // if destination reached its max, items should be swapped
        const destColumnMax = destinationColumn.max;
        if (destColumnMax && destItemsClone.length >= destColumnMax) {
          // do swapping
          // droppable index should be less than column max
          if(droppableDestination.index < destColumnMax) {
            // removing elements at their indexes
            const [soureceRemoved] = sourceItemsClone.splice(droppableSource.index, 1);
            const [destinationRemoved] = destItemsClone.splice(droppableDestination.index, 1);
            // adding source removed to destinattion,,, and desitnation removed to source
            destItemsClone.splice(droppableDestination.index, 0, soureceRemoved);
            sourceItemsClone.splice(droppableSource.index, 0, destinationRemoved);
          }
        } else {
          // remmove item from source
          const [removed] = sourceItemsClone.splice(droppableSource.index, 1);
          // add item to destination
          destItemsClone.splice(droppableDestination.index, 0, removed);
        }
  
        const result: any = {};
        result[droppableSource.droppableId] = sourceItemsClone;
        result[droppableDestination.droppableId] = destItemsClone;
      
        return result;
      },
      []
    );
  
    const onDragEnd = useCallback(
      (result: DropResult) => {
        const { source, destination } = result;
    
        // dropped outside the list
        if (!destination) {
          return;
        }

        // position at which the source name exists in array
        const sourceColumnIndex = columnIndex(columns, source.droppableId);
        // position at which the source name exists in array
        const destinationColumnIndex = columnIndex(columns, destination.droppableId);
    
        // if within same column
        if (source.droppableId === destination.droppableId) {
          // reorder them
          const reorderedList = reorder(
            // @ts-ignore. index signature for columns
            columns[sourceColumnIndex].items,
            source.index,
            destination.index
          );

          const columnsClone = Array.from(columns);
          // @ts-ignore. index signature for columns
          columnsClone[sourceColumnIndex].items = reorderedList;
    
          // update source column list state
          onColumnsUpdate(columnsClone, result);
        } else {
          // get the updated source and destination lists
          const moveResult = move(
            // @ts-ignore. index signature for columns
            columns[sourceColumnIndex],
            // @ts-ignore. index signature for columns
            columns[destinationColumnIndex],
            source,
            destination
          );

          const columnsClone = Array.from(columns);
          // @ts-ignore. index signature for columns
          columnsClone[sourceColumnIndex].items = moveResult[source.droppableId];
          // @ts-ignore. index signature for columns
          columnsClone[destinationColumnIndex].items = moveResult[destination.droppableId];
    
          // update source column list state
          onColumnsUpdate(columnsClone, result);
        }
      },
      [columns, onColumnsUpdate, move]
    );
  
    return (
      <div style={{display: 'flex'}}>
        <DragDropContext onDragEnd={onDragEnd}>
          {
            (columns as Column[]).map((col) => (
              <DragabbleColumn
                key={col.name} 
                droppableId={col.name}
                itemsMap={itemsMap}
                column={col}
                columns={columns as Column[]}
                isDragDisabled={isDragDisabled}
              />
            ))
          }
        </DragDropContext>
      </div>
    );
  }
);
