import React, { useCallback, useMemo } from 'react';

import { DragAndDrop } from '../drag-and-drop/drag-and-drop.component';
import { SimpleExpansionPanel } from '../../common/components/expansion-panel/expansion-panel.component';

import './app.css';

const COLUMN_HEIGHT = 500;

// styles for items
const getItemStyle = (item: any, snapshot: any, style: any) => {
  
  const { isDragging } = snapshot;
  return {
    ...style,
    padding: 8,
    background: isDragging? 'grey' : 'white',
  }
};

const Wrapper = ({id, style, item, column, index, updateState, columns}: any) => {
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
      id={id} 
      style={{
        height,
        overflow: 'scroll'
      }}
    />
  )
}

// fake data generator
function getItems(count: number, offset = 0, updateState: any) {
  return (
    Array.from({ length: count }, (v, k) => k).map(k => ({
      id: `item-${k + offset}`,
      expand: [0, 1, 2, 3, 4].includes(k+offset)? true : false, // business rule
      children: (snapshot: any, item: any, column: any, index: number, columns: any) => {
        return (
          <Wrapper
            key={index}
            handleExpand={(flag: boolean) => {}}
            id={k + offset} 
            item={item}
            column={column}
            index={index}
            columns={columns}
            updateState={updateState}
          />
        )
      },
      getItemStyle
    }
  )))
};

export class App extends React.Component {
  constructor(props: any) {
    super(props);
    this.updateStatex = this.updateStatex.bind(this);
    this.onColumnsUpdate = this.onColumnsUpdate.bind(this);

    this.state = {
      column1: {
        items: getItems(2, 0, this.updateStatex),
        max: 2,
        name: 'column1'
      },
      column2: {
        name: 'column2',
        items: getItems(2, 2, this.updateStatex),
        max: 2
      },
      column3: {
        name: 'column3', // have to use same name as prop, TODO: add ts to forec it
        items: getItems(5, 4, this.updateStatex)
      }
    }
  }

  updateStatex(state: any) {
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


// export const App = () => {
//   const [columns, setColumns] = useState<{[key: string]: Column}>(COLUMNS);

//   const updateStatex = useCallback(
//     (state: any) => {
//       updateState(state);
//     },
//     []
//   )

//   const COLUMNS = useMemo(
//     () => ({
//       column1: {
//         items: getItems(2, 0, updateStatex),
//         max: 2,
//         name: 'column1'
//       },
//       column2: {
//         name: 'column2',
//         items: getItems(2, 2, updateStatex),
//         max: 2
//       },
//       column3: {
//         name: 'column3', // have to use same name as prop, TODO: add ts to forec it
//         items: getItems(5, 4, updateStatex)
//       }
//     }),
//     [updateStatex]
//   )

  

//   const onColumnsUpdate = useCallback(
//     (obj: {[key: string]: Column}) => {
//       setColumns(obj);
//     },
//     []
//   )

//   return (
//     <div className="app-root">
//       <DragAndDrop 
//         columns={columns}
//         onColumnsUpdate={onColumnsUpdate}
//       />
//     </div>
//   );
// }

export default App;
