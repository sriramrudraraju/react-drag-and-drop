# React Drag and Drop

Implemented using [react-beautiful-dnd](https://github.com/atlassian/react-beautiful-dnd).

## `<DragAndDrop />`

| Props        | Type           | Description  |
| ------------- |:-------------| :-----|
| columns      | `Column`[ ] | `Column's` props |
| itemsMap     | {[key: number]: `ItemMap`}      |   `Item's` props |
| onColumnsUpdate | (cols: Column[], dropResult?: DropResult) => void   |    Invoked whenever the drag and drop positions changes |
| isDragDisabled      | Boolean | enable/disable drag and drop |

## `Column` Type

| Props        | Type           | Description  |
| ------------- |:-------------| :-----|
| items      | `BaseItem`[ ] | props needed for an `item` |
| name     | string      |   name of the `column` |
| style | object `<optional>`   |    style object |
| max      | number `<optional>` | max items that can be stacked into a column. After max number, items will start swapping |
| hide | boolean `<optional>`   |   hide/unmount the column from the UI |

## `ItemMap` Type

| Props        | Type           | Description  |
| ------------- |:-------------| :-----|
| children      | (props: ItemDetails<T>) => string (or) JSX.Element (or) null | function that will be invoked at the item position |
| getItemStyle      | (props: Required<ItemDetails<T>>) => object | returns style of an item |

## `BaseItem` Type

| Props        | Type           | Description  |
| ------------- |:-------------| :-----|
| id      | number | unique number for an `item` |

## `ItemDetails` Type

| Props        | Type           | Description  |
| ------------- |:-------------| :-----|
| index      | number | index at which item in the column |
| item      | `BaseItem` & `ItemMap`| `item` props |
| column      | `Column` | `column` props |
| columns      | `Column`[ ] | array of `columns` |
| draggingSnapshot      | DraggableStateSnapshot | dragging states provided by react-beautiful-dnd |
| style      | object `<optional>` | style object |

