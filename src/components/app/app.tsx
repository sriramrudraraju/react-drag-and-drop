import React, { useCallback, useMemo, useState } from 'react';

import { DragAndDrop } from '../drag-and-drop/drag-and-drop.component';
import { SimpleExpansionPanel } from '../../common/components/expansion-panel/expansion-panel.component';

import { Column } from '../drag-and-drop/dragabble-column/dragabble-column.component';
import { ItemDetails } from '../drag-and-drop/dragabble-item/dragabble-item.component';

const columnIndex = (cols: Column[], name: string) => {
  let x = -1;
  cols.forEach((col, i) => {
    if (col.name === name) {
      x = i;
    }
  })
  return x;
}

const COLUMNS = [
  {
    name: 'column1',
    max: 2,
    items: [{id: 1, expand: false}, {id: 2, expand: false}]
  },
  {
    name: 'column2',
    items: [{id: 3, expand: false}]
  }
]


// styles for items
function getItemStyle({draggingSnapshot, style}: ItemDetails) {
  const { isDragging } = draggingSnapshot;
  return {
    ...style,
    padding: 8,
    background: isDragging? 'grey' : 'white',
  }
};

export const App = () => {
  const [columns, setColumns] = useState<Column[]>(COLUMNS);

  const onColumnsUpdate = useCallback(
    (cols: Column[]) => {
      setColumns(cols);
    },
    []
  );

  const handleExpand = useCallback(
    (flag: boolean, itemDetails: ItemDetails) => {
      const { column, index } = itemDetails;
      const columnItems = [...column.items];
      columnItems[index].expand = flag;
      // position at which the source name exists in array
      const sourceColumnIndex = columnIndex(columns, column.name);
      const columnsClone = Array.from(columns);
      columnsClone[sourceColumnIndex].items = columnItems;
      setColumns(columnsClone)
    },
    [columns]
  );

  const itemsMap = useMemo(
    () => ({
      1: {
        getItemStyle,
        children: (itemDetails: ItemDetails) => {
          const { item } = itemDetails;
          return (
            <SimpleExpansionPanel 
              title={`${item.id}`} 
              isExpanded={item.expand}
              handleExpand={(flag: boolean) => handleExpand(flag, itemDetails)}
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
              handleExpand={(flag: boolean) => handleExpand(flag, itemDetails)}
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
              handleExpand={(flag: boolean) => handleExpand(flag, itemDetails)}
            />
          )
        }
      }
    }),
    [handleExpand]
  )

  return (
    <DragAndDrop 
      columns={columns}
      onColumnsUpdate={onColumnsUpdate}
      itemsMap={itemsMap}
    />
  )
}
