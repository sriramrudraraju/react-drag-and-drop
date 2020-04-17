import React, { FC } from 'react';
import { Droppable } from 'react-beautiful-dnd';

import { DragableItem, BaseItem, ItemMap } from '../dragabble-item/dragable-item.component';

export interface Column{
  items: BaseItem[];
  name: string; 
  style?: object; // column style
  max?: number; // max number of elements in a column
  hide?: boolean;
  [key: string]: any; // extar props specific to a project
}

export interface DragabbleColumnProps {
  itemsMap: {[key: number]: ItemMap };
  droppableId: string;
  column: Column;
  columns: {[key: string]: Column};
  isDragDisabled?: boolean;
}

export const DragabbleColumn: FC<DragabbleColumnProps> = React.memo(
  ({droppableId, column, columns, isDragDisabled, itemsMap}) => {
    const { items, style, hide } = column;
    
    if (hide) {
      return null;
    }

    return (
      <Droppable droppableId={droppableId}>
        {(provided) => (
          <div ref={provided.innerRef} {...provided.droppableProps} style={{...style}}>
            {
              items && items.map((ele, index) => (
                <DragableItem 
                  item={{...ele, ...itemsMap[ele.id]}} 
                  index={index} 
                  key={`${ele.id} ${index}`} 
                  column={column} 
                  columns={columns}
                  isDragDisabled={isDragDisabled}
                />
              ))
            }
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    );
  }
);
