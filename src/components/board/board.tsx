import React, { FC } from 'react';

import { BoardSquare } from '../../common/square/square';
import { Knight } from '../../common/knight/knight';

function renderPiece(x: number, y: number, [knightX, knightY]: [number, number]) {
  if (x === knightX && y === knightY) {
    return <Knight />
  }
  return null
}

function renderSquare(i: number, knightPosition: [number, number], onClick: (position: [number, number]) => void) {
  const x = i % 8
  const y = Math.floor(i / 8);

  return (
    <div 
      key={i} 
      style={{ width: '12.5%', height: '12.5%' }}
      onClick={() => onClick([x, y])}
    >
      <BoardSquare x={x} y={y} changePositionTo={(x, y) => onClick([x, y])}>
        {renderPiece(x, y, knightPosition)}
      </BoardSquare>
    </div>
  )
}

interface BoardProps {
  knightPosition: [number, number];
  moveTo: (position: [number, number]) => void;
  style?: object;
}

export const Board: FC<BoardProps> = ({knightPosition, moveTo, style}) => {

  const squares = []
  for (let i = 0; i < 64; i++) {
    squares.push(renderSquare(i, knightPosition, moveTo))
  }

  return (
    <div
      style={{
        ...style,
        display: 'flex',
        flexWrap: 'wrap',
      }}
    >
      {squares}
    </div>
  )
}