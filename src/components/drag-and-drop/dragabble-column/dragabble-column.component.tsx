import React, { FC } from 'react';
import { Droppable } from "react-beautiful-dnd";

import { DraggableCell, Element } from '../dragabble-cell/draggable-cell.component';

export interface DragabbleColumnProps {
  droppableId: string;
  list: Element[];
  style?: object;
}

export const DragabbleColumn: FC<DragabbleColumnProps> = ({droppableId, list, style}) => {
  return (
      <Droppable droppableId={droppableId}>
        {provided => (
          <div ref={provided.innerRef} {...provided.droppableProps} style={{...style}}>
            {
              list && list.map((ele, index) => (
                <DraggableCell element={ele} index={index} key={ele.id} />
              ))
            }
            {provided.placeholder}
          </div>
        )}
      </Droppable>
  )
}
