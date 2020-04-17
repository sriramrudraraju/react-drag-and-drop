import React from 'react';

import { DragAndDrop } from '../drag-and-drop/drag-and-drop.component';
import { SimpleExpansionPanel } from '../../common/components/expansion-panel/expansion-panel.component';

import { ItemDetails } from '../drag-and-drop/dragabble-item/dragable-item.component';

import './app.css';

const COLUMNS = {
  column1: {
    name: 'column1',
    max: 2,
    items: [{id: 1, expand: true}, {id: 2, expand: true}]
  },
  column2: {
    name: 'column2',
    items: [{id: 3, expand: true}]
  }
}
export class App extends React.Component<{}, any> {
  constructor(props: {}) {
    super(props);
    this.handleExpand = this.handleExpand.bind(this);
    this.onColumnsUpdate = this.onColumnsUpdate.bind(this);

    this.state = {
      items: {
        1: {
          getItemStyle,
          children: (itemDetails: ItemDetails) => {
            const { item } = itemDetails;
            return (
              <SimpleExpansionPanel 
                title={`${item.id}`} 
                isExpanded={item.expand}
                handleExpand={(flag: boolean) => this.handleExpand(flag, itemDetails)}
              />
            )
          }
        },
        2: {
          getItemStyle,
          children: (itemDetails: ItemDetails) => {
            const { item } = itemDetails;
            return (
              <SimpleExpansionPanel 
                title={`${item.id}`} 
                isExpanded={item.expand}
                handleExpand={(flag: boolean) => this.handleExpand(flag, itemDetails)}
              />
            )
          }
        },
        3: {
          getItemStyle,
          children: (itemDetails: ItemDetails) => {
            const { item } = itemDetails;
            return (
              <SimpleExpansionPanel 
                title={`${item.id}`} 
                isExpanded={item.expand}
                handleExpand={(flag: boolean) => this.handleExpand(flag, itemDetails)}
              />
            )
          }
        }
      },
      columns: COLUMNS
    }
  }

  handleExpand(flag: boolean, itemDetails: ItemDetails) {
    const { column, index } = itemDetails;
    const columnItems = [...column.items];
    columnItems[index].expand = flag;
    this.setState({
      columns: {
        ...this.state.columns,
        [column.name]: {
          ...this.state.columns[column.name],
          items: columnItems
        }
      }
    })
  }

  onColumnsUpdate(columns: any) {
    this.setState({
      columns
    });
  }

  render() {
    return (
      <div>
        <DragAndDrop 
          columns={this.state.columns}
          onColumnsUpdate={this.onColumnsUpdate}
          itemsMap={this.state.items}
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
