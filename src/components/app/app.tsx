import React, { useCallback, useMemo, useState } from 'react';

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
  const [columns, setColumns] = useState<any>(COLUMNS);

  const onColumnsUpdate = useCallback(
    (cols: any) => {
      setColumns(cols);
    },
    []
  );

  const handleExpand = useCallback(
    (flag: boolean, itemDetails: ItemDetails) => {
      const { column, index } = itemDetails;
      const columnItems = [...column.items];
      columnItems[index].expand = flag;
      setColumns({
        ...columns,
        [column.name]: {
          ...columns[column.name],
          items: columnItems
        }
      })
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
