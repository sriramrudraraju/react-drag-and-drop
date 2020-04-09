import React, { FC, useCallback } from 'react';
import { Draggable, DraggableStateSnapshot, DraggableProvided } from "react-beautiful-dnd";

import { Column } from '../dragabble-column/dragabble-column.component';

export interface Item {
  id: string | number; // NOTE: id has to be unique across all dragging elements
  children: (snapshot: DraggableStateSnapshot, item: Item, column: Column, index: number) => string | JSX.Element | null;
  getItemStyle?: (item: Item, snanShot: DraggableStateSnapshot, style: any) => object;
  [key: string]: any;
}

interface DraggableItemProps {
  item: Item;
  index: number;
  column: Column;
  columns: {[key: string]: Column}
}

export const DraggableItem: FC<DraggableItemProps> = ({ item, index, column, columns }) => {
  const getStyle = useCallback(
    (provided: DraggableProvided, snapshot: DraggableStateSnapshot) => {
      // more info on below structure 
      // https://github.com/atlassian/react-beautiful-dnd/issues/374#issuecomment-569817782
      const style = provided.draggableProps.style;
      // disabling the default animation.. as it looks wierd for swapping
      // TODO: do custom animation for swapping 
      if (item.getItemStyle) {
        // if callback exists pass the style to consumer, so they can update the style objects
        if (!snapshot.isDragging) return item.getItemStyle(item, snapshot, {});
        if (!snapshot.isDropAnimating) return item.getItemStyle(item, snapshot, style);
        return item.getItemStyle(
          item,
          snapshot,
          {
            ...style,
            // cannot be 0, but make it super tiny
            transitionDuration: `0.001s`,
          }
        )
      } else {
        if (!snapshot.isDragging) return {};
        if (!snapshot.isDropAnimating) return style;
        return {
          ...style,
          // cannot be 0, but make it super tiny
          transitionDuration: `0.001s`,
        }
      }
    },
    [item]
  );

  return (
    <Draggable draggableId={`${item.id}`} index={index}>
      {(provided, snapshot) => (
        <div
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={(ref) => provided.innerRef(ref)}
          style={getStyle(provided, snapshot)}
        >
          {item.children(snapshot, item, column, index)}
        </div>
      )}
    </Draggable>
  );
}