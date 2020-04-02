import React, { useState, useCallback } from 'react';

import { Board } from '../board/board';

import './app.css';

const START_POSITION: [number, number] = [0, 0];

export function canMoveKnight(toX: number, toY: number, fromPosition: [number, number]) {
  const [x, y] = fromPosition;
  const dx = toX - x
  const dy = toY - y

  return (
    (Math.abs(dx) === 2 && Math.abs(dy) === 1) ||
    (Math.abs(dx) === 1 && Math.abs(dy) === 2)
  )
}

function App() {
  const [knightPosition, setKnightPosition] = useState(START_POSITION);

  const moveTo = useCallback(
    (posiiton: [number, number]) => {
      const canKnightMv = canMoveKnight(posiiton[0], posiiton[1], knightPosition);
      if (canKnightMv) {
        setKnightPosition(posiiton);
      }
    },
    [knightPosition]
  )
  return (
    <div className="app-root">
      <Board 
        style={{height: 600, width: 600, margin: 'auto'}} 
        knightPosition={knightPosition} 
        moveTo={moveTo} 
      />
    </div>
  );
}

export default App;
