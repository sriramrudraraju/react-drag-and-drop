import React, { FC, useCallback } from 'react';
import { Draggable, DraggableStateSnapshot, DraggableProvided } from "react-beautiful-dnd";

import { Column } from '../dragabble-column/dragabble-column.component';

export interface ItemDetails {
  readonly index: number;
  readonly item: Item;
  readonly column: Column;
  readonly columns: {[key: string]: Column};
  readonly draggingSnapshot: DraggableStateSnapshot;
  readonly style?: any;
}

export interface Item {
  id: string | number; // NOTE: id has to be unique across all dragging elements
  children: (props: ItemDetails) => string | JSX.Element | null;
  getItemStyle?: (props: Required<ItemDetails>) => object;
  [key: string]: any;
}

interface DraggableItemProps {
  item: Item;
  index: number;
  column: Column;
  isDragDisabled?: boolean;
  columns: {[key: string]: Column}
}

export const DraggableItem: FC<DraggableItemProps> = React.memo(
  ({ item, index, column, columns, isDragDisabled = false }) => {
    const itemDetails = { index, item, column, columns };
    
    const getStyle = useCallback(
      (provided: DraggableProvided, snapshot: DraggableStateSnapshot) => {
        // more info on below structure 
        // https://github.com/atlassian/react-beautiful-dnd/issues/374#issuecomment-569817782
        const style = provided.draggableProps.style;
        // disabling the default animation.. as it looks wierd for swapping
        // TODO: do custom animation for swapping 
        if (item.getItemStyle) {
          // if callback exists pass the style to consumer, so they can update the style objects
          if (!snapshot.isDragging) return item.getItemStyle({...itemDetails, style: {}, draggingSnapshot: snapshot});
          if (!snapshot.isDropAnimating) return item.getItemStyle({...itemDetails, style, draggingSnapshot: snapshot});
          return item.getItemStyle({
            ...itemDetails, 
            style: {
              ...style,
              // cannot be 0, but make it super tiny
              transitionDuration: `0.001s`,
            }, 
            draggingSnapshot: snapshot
          })
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
      [itemDetails, item]
    );
  
    return (
      <Draggable 
        draggableId={`${item.id}`} 
        index={index} 
        isDragDisabled={isDragDisabled}
      >
        {(provided, snapshot) => (
          <div
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            ref={(ref) => provided.innerRef(ref)}
            style={getStyle(provided, snapshot)}
          >
            {item.children({...itemDetails, draggingSnapshot: snapshot})}
          </div>
        )}
      </Draggable>
    );
  }
);