import React from 'react';
import { useDrag, useDrop } from 'react-dnd';

import { itemTypes } from '../utils/dnd-item-types';

const styleDrag = {
  border: '1px solid gray',
  padding: 2,
  backgroundColor: 'white',
  cursor: 'move',
};

interface Item {
  type: string;
  id: string;
  originalIndex: string;
}

export interface CellProps {
  id: string;
  children: string | JSX.Element | null;
  moveCell: (id: string, to: number) => void;
  findCell: (id: string) => { index: number };
  columns: number;
  style?: object;
}

export const Cell: React.FC<CellProps> = ({ id, children, moveCell, findCell, columns, style }) => {
  const originalIndex = findCell(id).index; // index of ele in list

  const [{ isDragging }, drag] = useDrag({
    item: { type: itemTypes.ELEMENT, id, originalIndex },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
    end: (dropResult, monitor) => {
      const { id: droppedId, originalIndex } = monitor.getItem();
      const didDrop = monitor.didDrop();
      if (!didDrop) {
        moveCell(droppedId, originalIndex)
      }
    },
  });

  const [, drop] = useDrop({
    accept: itemTypes.ELEMENT,
    hover({ id: draggedId }: Item) {
      if (draggedId !== id) {
        const { index } = findCell(id);
        moveCell(draggedId, index);
      }
    }
  });

  const width = `calc(${100/columns}% - 8px)`;
  const opacity = isDragging ? 0 : 1;
  const border = isDragging ? '1px dashed gray': 'none';
  return (
    <div ref={drop} style={{ border, margin: 2, width}}>
      <div ref={drag} style={{ ...styleDrag, opacity, ...style }}>
        {children}
      </div>
    </div>
  )
}
