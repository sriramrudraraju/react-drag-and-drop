import React from 'react';
import { useDrag, useDrop } from 'react-dnd';

import { itemTypes } from '../utils/dnd-item-types';

import { List } from '../sorting.component';

const styleDrag = {
  padding: 2,
  cursor: 'move',
};

export interface Item {
  type: string;
  id: string;
  originalIndex: string;
}

export interface CellProps {
  id: string;
  children: string | JSX.Element | null;
  moveCell: (fromColumnId: string, toColumnId: string, droppedId: string, droppedCellIndex: number) => void;
  findCell: (id: string) => { index: number, cell: List };
  columnId: string;
  style?: object;
}

export const Cell: React.FC<CellProps> = ({ id, children, moveCell, findCell, columnId, style }) => {
  const cellIndex = findCell(id).index; // index of ele in list

  const [{ isDragging }, drag] = useDrag({
    item: { type: itemTypes.ELEMENT, id, cellIndex, columnId },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
    end: (item, monitor) => {
      const didDrop = monitor.didDrop();
      if (!didDrop) {
        const { id: droppedId, cellIndex, columnId: droppedColumnId } = monitor.getItem();
        moveCell(columnId, droppedColumnId, droppedId, cellIndex);
      } else {
        const { id: droppedId, droppedCellIndex, droppedColumnId } = monitor.getDropResult();
        moveCell(columnId, droppedColumnId, droppedId, droppedCellIndex);
      }
    }
  });

  const [, drop] = useDrop({
    accept: itemTypes.ELEMENT,
    drop(item, monitor) {
      return {...monitor.getItem(), droppedColumnId: columnId, droppedCellIndex: cellIndex};
    }
    // hover({ id: draggedId }: Item, monitor) {
    //   if (draggedId !== id) {
    //     const { index } = findCell(id);
    //     const { id: droppedId, columnId: droppedColumnId } = monitor.getItem();
    //     moveCell(droppedColumnId, columnId, droppedId, index);
    //   }
    // }
  });

  const opacity = isDragging ? 0 : 1;
  return (
    <div ref={drop} style={{ margin: 2 }}>
      <div ref={drag} style={{ ...styleDrag, opacity, ...style }}>
        {children}
      </div>
    </div>
  )
}
