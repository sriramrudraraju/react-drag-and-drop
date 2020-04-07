import React, { useState } from "react";
import { DragDropContext } from "react-beautiful-dnd";

import { DragabbleColumn } from  './dragabble-column/dragabble-column.component';

import { reorder } from './utils/reorder';

const initial = Array.from({ length: 10 }, (v, k) => k).map(k => {
  const custom = {
    id: `id-${k}`,
    children: `Quote ${k}`
  };
  return custom;
});

export const DragAndDrop = () => {
  const [state, setState] = useState(initial);

  function onDragEnd(result: any) {
    if (!result.destination) {
      return;
    }

    if (result.destination.index === result.source.index) {
      return;
    }

    const quotes = reorder(
      state,
      result.source.index,
      result.destination.index
    );

    setState(quotes);
  }

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <DragabbleColumn droppableId="List" list={state} />
    </DragDropContext>
  );
}
