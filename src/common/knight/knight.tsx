import React from 'react'
import { useDrag } from 'react-dnd'

import { itemTypes } from '../../utils/dnd-item-types';

export const Knight = () => {
  const [{isDragging}, drag] = useDrag({
    item: { type: itemTypes.KNIGHT },
		collect: monitor => ({
			isDragging: !!monitor.isDragging(),
		}),
  })

  return (
    <span 
      ref={drag}
      style={{
        fontSize: 64, 
        margin: '8px 16px',
        opacity: isDragging ? 0.5 : 1,
        fontWeight: 'bold',
        cursor: 'move',
      }}
    >
      ♘
    </span>
  )
}