import React, { FC, useCallback } from 'react';
import { useDrop } from 'react-dnd';

import { Cell } from './cell/cell';
import { itemTypes } from './utils/dnd-item-types';

export interface List {
  id: number | string;
  children: string | JSX.Element | null;
}

interface SortingProps {
  list: List[]; // array of elements
  moveCell: (fromColumnId: string, toColumnId: string, droppedId: string, droppedCellIndex: number) => void;
  columnId: string;
  style?: object;
}
export const Sorting: FC<SortingProps> = ({ list, columnId, moveCell, style }) => {

  const findCell = useCallback(
    (id: string) => {
      const cell = list.filter((c) => `${c.id}` === id)[0];
      return {
        cell,
        index: list.indexOf(cell),
      }
    },
    [list]
  );

  const [, drop] = useDrop({
    accept: itemTypes.ELEMENT,
    drop(item, monitor) {
      if(!list.length) {
        return {...monitor.getItem(), droppedColumnId: columnId, droppedCellIndex: 0};
      }
    }
  });

  return (
    <div
      ref={drop}
      style={{
        height: '100%',
        width: '100%',
        display: 'flex', 
        flexWrap: 'wrap', 
        justifyContent: 'space-between',
        ...style
      }}
    >
      {list.map((ele) => (
        <Cell
          key={ele.id}
          id={`${ele.id}`}
          moveCell={moveCell}
          findCell={findCell}
          columnId={columnId}
        >
          {ele.children}
        </Cell>
      ))}
    </div>
  )
}
