import React, { FC, useCallback } from 'react';
import { Draggable, DraggableStateSnapshot, DraggableProvided } from "react-beautiful-dnd";

import { Column } from '../dragabble-column/dragabble-column.component';

export interface Item {
  id: string | number; // NOTE: id has to be unique across all dragging elements
  children: (snapshot: DraggableStateSnapshot, item: Item, column: Column, index: number, columns: {[key: string]: Column}) => string | JSX.Element | null;
  getItemStyle?: (item: Item, snanShot: DraggableStateSnapshot, style: any, column: Column, index: number, columns: {[key: string]: Column}) => object;
  [key: string]: any;
}

interface DraggableItemProps {
  item: Item;
  index: number;
  column: Column;
  isDragDisabled?: boolean;
  columns: {[key: string]: Column}
}

export const DraggableItem: FC<DraggableItemProps> = ({ item, index, column, columns, isDragDisabled = false }) => {
  const getStyle = useCallback(
    (provided: DraggableProvided, snapshot: DraggableStateSnapshot) => {
      // more info on below structure 
      // https://github.com/atlassian/react-beautiful-dnd/issues/374#issuecomment-569817782
      const style = provided.draggableProps.style;
      // disabling the default animation.. as it looks wierd for swapping
      // TODO: do custom animation for swapping 
      if (item.getItemStyle) {
        // if callback exists pass the style to consumer, so they can update the style objects
        if (!snapshot.isDragging) return item.getItemStyle(item, snapshot, {}, column, index, columns);
        if (!snapshot.isDropAnimating) return item.getItemStyle(item, snapshot, style, column, index, columns);
        return item.getItemStyle(
          item,
          snapshot,
          {
            ...style,
            // cannot be 0, but make it super tiny
            transitionDuration: `0.001s`,
          }, 
          column, index, columns
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
    [item, column, index, columns]
  );

  return (
    <Draggable draggableId={`${item.id}`} index={index} isDragDisabled={isDragDisabled}>
      {(provided, snapshot) => (
        <div
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={(ref) => provided.innerRef(ref)}
          style={getStyle(provided, snapshot)}
        >
          {item.children(snapshot, item, column, index, columns)}
        </div>
      )}
    </Draggable>
  );
}