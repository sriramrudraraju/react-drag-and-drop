import React from 'react';
import { Droppable } from "react-beautiful-dnd";

import { DraggableCell, Element } from '../dragabble-cell/draggable-cell.component';

interface DragabbleColumnProps<T> {
  droppableId: string;
  list: T[];
}

export const DragabbleColumn = <T extends Element>({droppableId, list}: DragabbleColumnProps<T>) => {
  return (
      <Droppable droppableId={droppableId}>
        {provided => (
          <div ref={provided.innerRef} {...provided.droppableProps}>
            {
              list.map((ele, index) => (
                <DraggableCell element={ele} index={index} key={ele.id} />
              ))
            }
            {provided.placeholder}
          </div>
        )}
      </Droppable>
  )
}
