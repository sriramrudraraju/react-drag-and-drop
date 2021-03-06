import React, { FC, useCallback } from 'react';
import { Draggable, DraggableStateSnapshot, DraggableProvided } from 'react-beautiful-dnd';

import { Column } from '../dragabble-column/dragabble-column.component';

export interface ItemDetails<T = {}> {
  readonly index: number;
  readonly item: Item<T>;
  readonly column: Column<T>;
  readonly columns: Column<T>[];
  readonly draggingSnapshot: DraggableStateSnapshot;
  readonly style?: any;
}

export interface ItemMap<T = {}> {
  children: (props: ItemDetails<T>) => string | JSX.Element | null;
  getItemStyle?: (props: Required<ItemDetails<T>>) => object;
}

export type BaseItem<T = {}> = {
  id: number; // NOTE: id has to be unique across all dragging elements
} & T

export type Item<T = {}> = BaseItem<T> & ItemMap<T>;

interface DragableItemProps {
  item: Item;
  index: number;
  column: Column;
  isDragDisabled?: boolean;
  columns: Column[];
}

export const DragableItem: FC<DragableItemProps> = React.memo(
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
          if (!snapshot.isDragging) {
            return item.getItemStyle({...itemDetails, style: {}, draggingSnapshot: snapshot});
          }
          if (!snapshot.isDropAnimating) {
            return item.getItemStyle({...itemDetails, style, draggingSnapshot: snapshot});
          }
          return item.getItemStyle({
            ...itemDetails, 
            style: {
              ...style,
              // cannot be 0, but make it super tiny
              transitionDuration: `0.001s`,
            }, 
            draggingSnapshot: snapshot
          });
        } else {
          if (!snapshot.isDragging) {
            return {};
          }
          if (!snapshot.isDropAnimating) {
            return style;
          }
          return {
            ...style,
            // cannot be 0, but make it super tiny
            transitionDuration: `0.001s`,
          };
        }
      },
      [itemDetails, item]
    );

    if (item.id && !item.children) {
      // extra error message ids are not properly matched in item maps and column ids
      console.error('Children missing for dragabble item with id:', item.id);
    }
  
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
