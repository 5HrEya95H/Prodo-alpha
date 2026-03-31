import React from 'react'
import { IoMdClose } from "react-icons/io";

const Note = ({ note, handleDragStart }) => {
  return (
    <div 
      className='note'
      style={{
        position: "absolute",
        left: `${note.position?.x}px`,
        top: `${note.position?.y}px`,
      }}
    >
      <div className='Notehead'>
        <div onMouseDown={(e) => handleDragStart(note, e)} style={{cursor: 'move'}}>📌</div>

        <input className='NoteName' placeholder='Title' />

        <button className='NoteBtn'>
          <IoMdClose size={15}/>
        </button>
      </div>

      <div className='NoteText'>{note.text}</div>
    </div>
  )
}

export default Note