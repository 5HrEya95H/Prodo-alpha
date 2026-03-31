import React from 'react'

const Note = ({content, initialPos,...props}) => {
  return (
    <div className='note' {...props}
    style={{
      left: `${initialPos?.x}px`,
      top: `${initialPos?.y}px`,
    }}>
      📌{content}
    </div>
  )
}

export default Note