import React, { useState, useCallback  } from 'react';

import { Sorting } from '../sorting/sorting.component';

import './app.css';

const LIST = [
  {
    id: 1,
    children: '1',
  },
  {
    id: 2,
    children: '2',
  },
  {
    id: 3,
    children: '3',
  },
  {
    id: 4,
    children: '4',
  }
];

function App() {

  const [list, setList] = useState(LIST);
  const onListChange = useCallback(
    (eleList) => {
      setList(eleList);
    },
    [setList]
  )

  return (
    <div className="app-root">
      <Sorting 
        list={list}
        onListChange={onListChange}
        columns={3}
      />
    </div>
  );
}

export default App;
