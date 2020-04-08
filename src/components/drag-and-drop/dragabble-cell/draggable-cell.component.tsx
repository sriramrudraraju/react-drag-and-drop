import React, { FC } from 'react';
import { Draggable } from "react-beautiful-dnd";

export interface Item {
  id: string | number; // NOTE: id has to be unique across all dragging elements
  children: string | JSX.Element | null;
  getCellStyle?: (isDragging: boolean) => object;
}

interface DraggableCellProps {
  item: Item;
  index: number;
}

export const DraggableCell: FC<DraggableCellProps> = ({ item, index }) => {
  return (
    <Draggable draggableId={`${item.id}`} index={index}>
      {(provided, draggableSnapshot) => (
        <div
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          <div 
            ref={provided.innerRef}
            style={item.getCellStyle && item.getCellStyle(
              draggableSnapshot.isDragging
            )}
          >
            {item.children}
          </div>
        </div>
      )}
    </Draggable>
  );
}