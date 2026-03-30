import React from 'react'

const Note = ({content,...props}) => {
  return (
    <div className='note'>{content}</div>
  )
}

export default Note