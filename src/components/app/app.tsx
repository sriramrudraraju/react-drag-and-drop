import React, { useCallback, useMemo } from 'react';

import { DragAndDrop } from '../drag-and-drop/drag-and-drop.component';
import { SimpleExpansionPanel } from '../../common/components/expansion-panel/expansion-panel.component';

import { Column } from '../drag-and-drop/dragabble-column/dragabble-column.component';
import { ItemDetails } from '../drag-and-drop/dragabble-item/draggable-item.component';

import './app.css';

const COLUMN_HEIGHT = 500;

export class App extends React.Component<{}, {[key: string]: Column}> {
  constructor(props: {}) {
    super(props);
    this.updateState = this.updateState.bind(this);
    this.onColumnsUpdate = this.onColumnsUpdate.bind(this);

    this.state = {
      column1: {
        items: getItems(2, 0, this.updateState),
        max: 2,
        name: 'column1'
      },
      column2: {
        name: 'column2',
        items: getItems(2, 2, this.updateState),
        max: 2
      },
      column3: {
        name: 'column3', // have to use same name as prop, TODO: add ts to forec it
        items: getItems(5, 4, this.updateState)
      }
    }
  }

  updateState(state: {[key: string]: Column}) {
    this.setState(state);
  }

  onColumnsUpdate(state: any) {
    // TODO: collapse all items thats moving to column3
    this.setState(state);
  }

  render() {
    return (
      <div className="app-root">
        <DragAndDrop 
          columns={this.state}
          onColumnsUpdate={this.onColumnsUpdate}
        />
      </div>
    );
  }
}

// styles for items
function getItemStyle({draggingSnapshot, style}: ItemDetails) {
  const { isDragging } = draggingSnapshot;
  return {
    ...style,
    padding: 8,
    background: isDragging? 'grey' : 'white',
  }
};

// fake data generator
function getItems(count: number, offset = 0, updateState: (obj: {[key: string]: Column}) => void) {
  return (
    Array.from({ length: count }, (v, k) => k).map(k => ({
      id: `item-${k + offset}`,
      expand: [0, 1, 2, 3, 4].includes(k+offset)? true : false, // business rule
      children: (itemDetails: ItemDetails) => {
        return (
          <Wrapper
            key={itemDetails.index}
            title={`${k + offset}`} 
            updateState={updateState}
            {...itemDetails}
          />
        )
      },
      getItemStyle
    }
  )))
};

function Wrapper( wrapperProps: ItemDetails & { title: string; updateState: (obj: {[key: string]: Column}) => void}) {
  const {title,item, column, index, updateState, columns} = wrapperProps;
  /**
   * business rule
   * expanded acordions should take the remaining height of column
   */
  const expanded = column.items.filter((x: any) => x.expand === true).length;
  const collapsed = column.items.length - expanded;
  const height = useMemo(
    () => {
      const length = column.items.length;
      /**
       * (
       *  (
       *    coulmn height - (items length * top+bottom padding) - (height of collapsed item * collapsed items)
       *  ) / (expanded items)
       * ) - (height of expanded header + to+bottom padding of content)
       */ 
      return `calc(${((COLUMN_HEIGHT - (length * 16) - (48 * collapsed)) / expanded) - (64 + 32)}px)`;
    },
    [column.items, expanded, collapsed]
  )

  const updateExpand = useCallback(
    (val: boolean) => {
      const columnItemsClone = [...column.items];
      /**
       * business rule
       * when in last column i.e column3,
       * if a new acordion is trying to expand, collapse others
       */
      if(column.name === 'column3') {
        columnItemsClone.forEach((col, i) => {
          if(i !== index) {
            // setting others to false
            columnItemsClone[i].expand = false;
          }
        })
      }
      columnItemsClone[index].expand = val;

      updateState({
        ...columns,
        [column.name]: {
          ...columns[column.name],
          items: columnItemsClone
        }
      });
    },
    [updateState, column, columns, index]
  )

  return (
    <SimpleExpansionPanel
      isExpanded={item.expand} 
      handleExpand={updateExpand}
      title={title} 
      style={{
        height,
        overflow: 'scroll'
      }}
    />
  )
}
