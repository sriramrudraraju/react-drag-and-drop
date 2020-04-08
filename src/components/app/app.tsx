import React from 'react';

import { DragAndDrop } from '../drag-and-drop/drag-and-drop.component';

import './app.css';

// styles for cells
const getCellStyle = (isDragging: boolean) => {
  return ({
    // some basic styles to make the items look a bit nicer
    userSelect: 'none',
    padding: 8 * 2,
    margin: `0 0 $8px 0`,
    border: '5px solid yellow',
    height: 30,
    width: 100,
  
    // change background colour if dragging
    background: isDragging ? 'lightgreen' : 'red',
  })
};

// fake data generator
const getItems = (count: number, offset = 0) =>
  Array.from({ length: count }, (v, k) => k).map(k => ({
      id: `item-${k + offset}`,
      children: <div >item {k + offset}</div>,
      getCellStyle
  }));

const cols = {
  list1: {
    list: getItems(10),
    style: {
      margin: 16,
      maxHeight: 500,
      overflow: 'auto'
    },
  },
  list2: {
    list: getItems(5, 10),
    style: {
      margin: 16
    }
  },
  list3: {
    list: getItems(10, 15),
    style: {
      margin: 16
    }
  }
}

export const App = () => {
  return (
    <div className="app-root">
      <DragAndDrop 
        columns={cols}
      />
    </div>
  );
}

export default App;
