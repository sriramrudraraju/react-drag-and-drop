import React from 'react';
import { Draggable } from "react-beautiful-dnd";

export interface Element {
  id: string | number;
  children: string | JSX.Element | null;
}

interface DraggableCellProps<T> {
  element: T;
  index: number;
}

export const DraggableCell = <T extends Element>({ element, index }: DraggableCellProps<T>) => {
  return (
    <Draggable draggableId={`${element.id}`} index={index}>
      {provided => (
        <div
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          <div 
            ref={provided.innerRef}
            style={{
              width: 200,
              border: '1px solid gray',
              marginBottom: 8,
              padding: 8,
              backgroundColor: 'lightblue'
            }}
          >
            {element.children}
          </div>
        </div>
      )}
    </Draggable>
  );
}