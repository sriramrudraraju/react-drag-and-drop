import React, { FC } from 'react';
import { Droppable } from "react-beautiful-dnd";

import { DraggableItem, Item } from '../dragabble-item/draggable-item.component';

export interface DragabbleColumnProps {
  droppableId: string;
  items: Item[];
  style?: object;
}

export const DragabbleColumn: FC<DragabbleColumnProps> = ({droppableId, items, style}) => {
  return (
      <Droppable droppableId={droppableId}>
        {provided => (
          <div ref={provided.innerRef} {...provided.droppableProps} style={{...style}}>
            {
              items && items.map((ele, index) => (
                <DraggableItem item={ele} index={index} key={ele.id} />
              ))
            }
            {provided.placeholder}
          </div>
        )}
      </Droppable>
  )
}
