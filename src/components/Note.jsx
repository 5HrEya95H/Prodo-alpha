import React, { forwardRef } from 'react'

const Note = forwardRef(({content, initialPos,...props},ref) => {
  return (
    <div 
    ref={ref}
    className='note' {...props}
    style={{
      left: `${initialPos?.x}px`,
      top: `${initialPos?.y}px`,
    }}>
      📌{content}
    </div>
  )
})

export default Note