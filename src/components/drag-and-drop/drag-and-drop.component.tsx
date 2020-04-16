import React, { FC, useCallback } from 'react';
import { DragDropContext, DropResult, DraggableLocation } from 'react-beautiful-dnd';

import { DragabbleColumn, Column } from './dragabble-column/dragabble-column.component';
import { ItemMap } from './dragabble-item/dragabble-item.component';

import { reorder } from './utils/reorder';

interface DragAndDropProps {
  columns: {[key: string]: Column};
  itemsMap: {[key: number]: ItemMap};
  onColumnsUpdate: (obj: {[key: string]: Column}, dropResult?: DropResult) => void;
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
          }, result);
        } else {
          // get the updated source and destination lists
          const moveResult = move(
            columns[source.droppableId],
            columns[destination.droppableId],
            source,
            destination
          );
    
          onColumnsUpdate({
            ...columns,
            [source.droppableId]: {
              ...columns[source.droppableId],
              items: moveResult[source.droppableId]
            },
            [destination.droppableId]: {
              ...columns[destination.droppableId],
              items: moveResult[destination.droppableId]
            }
          }, result);
        }
      },
      [columns, onColumnsUpdate, move]
    );
  
    return (
      <div style={{display: 'flex'}}>
        <DragDropContext onDragEnd={onDragEnd}>
          {
            Object.keys(columns).map((key) => (
              <DragabbleColumn
                key={key} 
                droppableId={key}
                itemsMap={itemsMap}
                column={columns[key]}
                columns={columns}
                isDragDisabled={isDragDisabled}
              />
            ))
          }
        </DragDropContext>
      </div>
    );
  }
);
