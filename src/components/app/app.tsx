import React, { useState, useCallback } from 'react';

import { DragAndDrop, Column } from '../drag-and-drop/drag-and-drop.component'

import './app.css';

const COLUMNS = [
  {
    id: 1,
    name: 'column1',
    dropType: ['element'],
    list: [
      {
        id: 2,
        children: 'Panel 2'
      },
      {
        id: 3,
        children: 'Panel 3'
      },
      {
        id: 5,
        children: 'Panel 5'
      }
    ]
  },
  {
    id: 6,
    name: 'column2',
    dropType: ['element'],
    list: [
      {
        id: 7,
        children: 'Panel 7'
      },
      {
        id: 8,
        children: 'Panel 8'
      },
      {
        id: 9,
        children: 'Panel 9'
      }
    ]
  }
];

export const App = () => {
  const [columns, setColumns] = useState<Column[]>(COLUMNS);

  const onColumnsChange = useCallback(
    (columns: Column[]) => {
      console.log(columns)
      // console.log(columns)
      setColumns(columns);
    },
    [setColumns]
  );

  return (
    <div className="app-root">
      <DragAndDrop 
        columns={columns}
        onColumnsChange={onColumnsChange}
      />
    </div>
  );
}

export default App;
