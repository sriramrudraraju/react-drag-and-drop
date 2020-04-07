import React, { FC, useCallback  } from 'react';

import { Sorting, List } from './sorting.component';
import { shiftItemFromTo } from './utils/shift-item-from-to';

export interface Column {
  id: string | number;
  name?: string;
  dropType: string[];
  list: List[];
}

interface DragAndDropProps {
  columns: Column[];
  onColumnsChange: (columns: Column[]) => void;
}
export const DragAndDrop: FC<DragAndDropProps> = ({columns, onColumnsChange}) => {


  const moveCell = useCallback(
    (fromColumnId: string, toColumnId: string, droppedId: string, droppedCellIndex: number) => {
      const copy = JSON.parse(JSON.stringify(columns)); // TODO: Heavy operation

      const fromColumn = columns.filter((c) =>  `${c.id}` === fromColumnId)[0];
      const fromColumnIndex = columns.indexOf(fromColumn);

      const droppedCell = fromColumn.list.filter((c) => `${c.id}` === droppedId)[0];
      // index of dropped cell before its dropped to new location
      const droppedCellOriginalIndex = fromColumn.list.indexOf(droppedCell);

      const toColumn = columns.filter((c) =>  `${c.id}` === toColumnId)[0];
      const toColumnIndex = columns.indexOf(toColumn);
      
      // if from same column, just rearrage them
      if(fromColumnId === toColumnId) {
        // if same cell indexes
        if(droppedCellOriginalIndex === droppedCellIndex) {
          return
        }
        const updatedList = shiftItemFromTo(droppedCellOriginalIndex, droppedCellIndex, fromColumn.list);
        copy[fromColumnIndex].list = updatedList;
      } else {
        // delete cell from the source column
        copy[fromColumnIndex].list.splice(droppedCellOriginalIndex, 1);
        // add cell to destination column
        copy[toColumnIndex].list.splice(droppedCellIndex, 0, droppedCell);
      }
      // console.log(copy)

      onColumnsChange(copy);
    },
    [columns, onColumnsChange]
  );

  return (
    <div className="app-root">
      {
        columns.map((column) => (
          <Sorting
            key={column.id}
            columnId={`${column.id}`}
            list={column.list}
            moveCell={moveCell}
            style={{width: 100}}
          />
        ))
      }
    </div>
  );
}
