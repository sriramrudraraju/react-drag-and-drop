import React from 'react';

import { DragAndDrop } from '../drag-and-drop/drag-and-drop.component';

import './app.css';

// fake data generator
const getItems = (count: number, offset = 0) =>
    Array.from({ length: count }, (v, k) => k).map(k => ({
        id: `item-${k + offset}`,
        children: `item ${k + offset}`
    }));

/**
 * droppableId should have same names as keys in config
 */
const columns = {
  list1: getItems(10),
  list2: getItems(5, 10),
  list3: getItems(10, 15),
};
const droppableIds = ['list1', 'list2', 'list3'];

export const App = () => {
  return (
    <div className="app-root">
      <DragAndDrop 
        columns={columns}
        dropabbleIds={droppableIds}
      />
    </div>
  );
}

export default App;
