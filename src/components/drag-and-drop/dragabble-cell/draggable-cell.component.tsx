import React, { FC } from 'react';
import { Draggable } from "react-beautiful-dnd";

export interface Element {
  id: string | number; // NOTE: id has to be unique across all dragging elements
  children: string | JSX.Element | null;
  getCellStyle?: (isDragging: boolean) => object;
}

interface DraggableCellProps {
  element: Element;
  index: number;
}

export const DraggableCell: FC<DraggableCellProps> = ({ element, index }) => {
  return (
    <Draggable draggableId={`${element.id}`} index={index}>
      {(provided, draggableSnapshot) => (
        <div
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          <div 
            ref={provided.innerRef}
            style={element.getCellStyle && element.getCellStyle(
              draggableSnapshot.isDragging
            )}
          >
            {element.children}
          </div>
        </div>
      )}
    </Draggable>
  );
}