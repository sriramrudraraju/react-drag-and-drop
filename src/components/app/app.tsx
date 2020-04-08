import React, { useState, useCallback } from 'react';

import { DragAndDrop, Column } from '../drag-and-drop/drag-and-drop.component';
import { SimpleExpansionPanel } from '../../common/components/expansion-panel/expansion-panel.component';

import './app.css';

// styles for items
const getItemStyle = (isDragging: boolean) => {
  return ({
    // some basic styles to make the items look a bit nicer
    userSelect: 'none',
    padding: 4,
    marginBottom: 4,
    // change background colour if dragging
  })
};

// fake data generator
const getItems = (count: number, offset = 0) =>
  Array.from({ length: count }, (v, k) => k).map(k => ({
      id: `item-${k + offset}`,
      children: () => <SimpleExpansionPanel id={k + offset} />,
      getItemStyle
  }));


const COLUMNS = {
  column1: {
    items: getItems(5)
  },
  column2: {
    items: getItems(5, 5)
  },
  column3: {
    items: getItems(5, 10)
  }
}

export const App = () => {
  const [columns, setColumns] = useState<Column>(COLUMNS);

  const onColumnsUpdate = useCallback(
    (obj: Column) => {
      setColumns(obj);
    },
    []
  )

  return (
    <div className="app-root">
      <DragAndDrop 
        columns={columns}
        onColumnsUpdate={onColumnsUpdate}
      />
    </div>
  );
}

export default App;
