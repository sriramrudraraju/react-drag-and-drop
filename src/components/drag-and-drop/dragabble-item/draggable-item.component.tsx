import React, { FC } from 'react';
import { Draggable, DraggingStyle, NotDraggingStyle, DraggableStateSnapshot } from "react-beautiful-dnd";

import { Column } from '../dragabble-column/dragabble-column.component';

export interface Item {
  id: string | number; // NOTE: id has to be unique across all dragging elements
  children: (snapshot: DraggableStateSnapshot, item: Item, column: Column, index: number) => string | JSX.Element | null;
  getItemStyle?: (snapshot: DraggableStateSnapshot, style?: DraggingStyle | NotDraggingStyle) => any;
}

interface DraggableItemProps {
  item: Item;
  index: number;
  column: Column;
}

export const DraggableItem: FC<DraggableItemProps> = ({ item, index, column }) => {
  return (
    <Draggable draggableId={`${item.id}`} index={index}>
      {(provided, snapshot) => (
        <div
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          <div 
            ref={(ref) => provided.innerRef(ref)}
            style={item.getItemStyle && item.getItemStyle(
              snapshot,
              provided.draggableProps.style
            )}
          >
            {item.children(snapshot, item, column, index)}
          </div>
        </div>
      )}
    </Draggable>
  );
}