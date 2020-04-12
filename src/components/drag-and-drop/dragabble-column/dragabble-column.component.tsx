import React, { FC } from 'react';
import { Droppable } from "react-beautiful-dnd";

import { DraggableItem, Item } from '../dragabble-item/draggable-item.component';

export interface Column{
  items: Item[];
  name: string; 
  style?: object; // column style
  max?: number; // max number of elements in a column
}

export interface DragabbleColumnProps {
  droppableId: string;
  column: Column;
  columns: {[key: string]: Column};
  isDragDisabled?: boolean;
}

export const DragabbleColumn: FC<DragabbleColumnProps> = React.memo(
  ({droppableId, column, columns, isDragDisabled}) => {
    const { items, style } = column;
    return (
        <Droppable droppableId={droppableId}>
          {(provided) => (
            <div ref={provided.innerRef} {...provided.droppableProps} style={{...style}}>
              {
                items && items.map((ele, index) => (
                  <DraggableItem 
                    item={ele} 
                    index={index} 
                    key={ele.id} 
                    column={column} 
                    columns={columns}
                    isDragDisabled={isDragDisabled}
                  />
                ))
              }
              {provided.placeholder}
            </div>
          )}
        </Droppable>
    )
  }
)
