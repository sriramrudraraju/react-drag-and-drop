import React, { useState, useCallback } from 'react';

import { DragAndDrop } from '../drag-and-drop/drag-and-drop.component';
import { SimpleExpansionPanel } from '../../common/components/expansion-panel/expansion-panel.component';

import { Column } from '../drag-and-drop/dragabble-column/dragabble-column.component';

import './app.css';

// styles for items
const getItemStyle = (item: any, snapshot: any, style: any) => {
  const { isDragging } = snapshot;
  return {
    ...style,
    padding: 8,
    background: isDragging? 'grey' : 'white',
  }
};

// fake data generator
function getItems(count: number, offset = 0) {
  return (
    Array.from({ length: count }, (v, k) => k).map(k => ({
      id: `item-${k + offset}`,
      expand: false,
      children: (snapshot: any, item: any, column: any, index: number) => {
        const isExpanded = (
          (column.name === 'column1' || column.name === 'column2' || column.name === 'column3') &&
          (index === 0 || index === 1)
        ) ? true : false;

        return (
          <SimpleExpansionPanel
            key={index}
            isExpanded={isExpanded} 
            id={k + offset} 
            style={{
              height: 200, 
              overflow: 'scroll'
            }}
          />
        )
      },
      getItemStyle
    }
  )))
};


const COLUMNS = {
  column1: {
    items: getItems(2),
    max: 2,
    name: 'column1',
    style: {
      display: 'flex',
      flexDirection: 'column',
      flexGrow: 1,
      alignContent: 'stretch'
    }
  },
  column2: {
    name: 'column2',
    items: getItems(2, 2),
    max: 2
  },
  column3: {
    name: 'column3', // have to use same name as prop, TODO: add ts to forec it
    items: getItems(5, 4)
  }
}

export const App = () => {
  const [columns, setColumns] = useState<{[key: string]: Column}>(COLUMNS);

  const onColumnsUpdate = useCallback(
    (obj: {[key: string]: Column}) => {
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
