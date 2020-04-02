import React, { FC } from 'react';
import { useDrop } from 'react-dnd';

import { itemTypes } from '../../utils/dnd-item-types';

interface SquareProps {
  children: JSX.Element | null;
  black?: boolean;
}

export const Square: FC<SquareProps> = ({ children, black = false }) => {
  const fill = black ? 'black' : 'white';
  const stroke = black ? 'white' : 'black';

  return (
    <div 
      style={{
        backgroundColor: fill,
        color: stroke,
        width: '100%',
        height: '100%',
      }}
    >
      { children }
    </div>
  )
}

interface BoardSquareProps {
  x: number;
  y: number;
  children: JSX.Element | null;
  changePositionTo: (x: number, y: number) => void;
}

export const BoardSquare: FC<BoardSquareProps> = ({ x, y, children, changePositionTo }) => {
  const black = (x + y) % 2 === 1;
  const [{ isOver }, drop] = useDrop({
		accept: itemTypes.KNIGHT,
		drop: () => changePositionTo(x, y),
		collect: monitor => ({
			isOver: !!monitor.isOver(),
		}),
  });
  
  return (
    <div
      ref={drop}
      style={{
        position: 'relative',
        width: '100%',
        height: '100%',
      }}
    >
      <Square black={black}>{children}</Square>
      {isOver && (
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            height: '100%',
            width: '100%',
            zIndex: 1,
            opacity: 0.5,
            backgroundColor: 'yellow',
          }}
        />
      )}
    </div>
  )
}