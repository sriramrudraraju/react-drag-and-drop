import React, { FC } from 'react';
import { Droppable } from "react-beautiful-dnd";

import { DraggableCell, Item } from '../dragabble-cell/draggable-cell.component';

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
                <DraggableCell item={ele} index={index} key={ele.id} />
              ))
            }
            {provided.placeholder}
          </div>
        )}
      </Droppable>
  )
}
