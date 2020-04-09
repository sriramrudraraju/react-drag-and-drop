import React, { useState, useCallback } from 'react';
import { DraggingStyle, NotDraggingStyle, DraggableStateSnapshot } from "react-beautiful-dnd";

import { DragAndDrop } from '../drag-and-drop/drag-and-drop.component';
import { SimpleExpansionPanel } from '../../common/components/expansion-panel/expansion-panel.component';

import { Column } from '../drag-and-drop/dragabble-column/dragabble-column.component';

import './app.css';

// styles for items
const getItemStyle = (snapshot: DraggableStateSnapshot, style?:  DraggingStyle | NotDraggingStyle) => {
  // more info on how to play with drop animation
  // https://github.com/atlassian/react-beautiful-dnd/blob/master/docs/guides/drop-animation.md
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
  }));


const COLUMNS = {
  column1: {
    items: getItems(2),
    max: 2,
    style: {
      display: 'flex',
      flexDirection: 'column',
      flexGrow: 1,
      alignContent: 'stretch'
    }
  },
  column2: {
    items: getItems(2, 2),
    max: 2
  },
  column3: {
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
