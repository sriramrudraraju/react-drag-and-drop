import React, { FC } from 'react';
import { Droppable } from "react-beautiful-dnd";

import { DraggableItem, Item } from '../dragabble-item/draggable-item.component';

export interface Column {
  items: Item[]; 
  style?: object; // column style
  max?: number; // max number of elements in a column
  name?: string;
}

export interface DragabbleColumnProps {
  droppableId: string;
  column: Column
}

export const DragabbleColumn: FC<DragabbleColumnProps> = ({droppableId, column}) => {
  const { items, style } = column;
  return (
      <Droppable droppableId={droppableId}>
        {provided => (
          <div ref={provided.innerRef} {...provided.droppableProps} style={{...style}}>
            {
              items && items.map((ele, index) => (
                <DraggableItem item={ele} index={index} key={ele.id} column={column} />
              ))
            }
            {provided.placeholder}
          </div>
        )}
      </Droppable>
  )
}
