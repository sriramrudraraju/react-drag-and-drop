import React, { FC, useCallback } from 'react';

import { Cell } from './cell/cell';

import { shiftItemFromTo } from './utils/shift-item-from-to';

interface List {
  id: number | string;
  children: string | JSX.Element | null;
}

interface SortingProps {
  list: List[]; // array of elements
  onListChange: (list: List[]) => void;
  columns?: number; // number of elements per row; default = 1
  style?: object;
}
export const Sorting: FC<SortingProps> = ({ list, columns = 1, onListChange, style }) => {

  const findCell = useCallback(
    (id: string) => {
      const cell = list.filter((c) => `${c.id}` === id)[0]
      return {
        cell,
        index: list.indexOf(cell),
      }
    },
    [list]
  )

  const moveCell = useCallback(
    (dragIndex: string, hoverIndex: number) => {
      const { index } = findCell(dragIndex);
      const newList = shiftItemFromTo(index, hoverIndex, list);
      onListChange(newList);
    },
    [list, onListChange, findCell]
  );

  return (
    <div 
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
          columns={columns}
        >
          {ele.children}
        </Cell>
      ))}
    </div>
  )
}
