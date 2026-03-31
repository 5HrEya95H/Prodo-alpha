import React, { forwardRef } from 'react'
import {IoMdClose} from "react-icons/io";

const Note = forwardRef(({content, initialPos,...props},ref) => {
  return (
    <div 
    ref={ref}
    className='note' {...props}
    style={{
      left: `${initialPos?.x}px`,
      top: `${initialPos?.y}px`,
    }}>
      <div className='Notehead'>
        <div className='move'>📌</div>
        <input className='NoteName' placeholder='Title'></input>
        <button className='NoteBtn'><IoMdClose size={15}/></button>
      </div>
      <div className='NoteText'>{content}</div>
      
    </div>
  )
})

export default Note