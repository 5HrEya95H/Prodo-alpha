import React from 'react'
import { IoMdClose } from "react-icons/io";

const Note = ({ note, handleDragStart, onUpdate }) => {
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

        <input className='NoteName' placeholder='Title' onChange={(e) =>
          onUpdate(note.id, { title: e.target.value })
        } />

        <button className='NoteBtn'>
          <IoMdClose size={15}/>
        </button>
      </div>

      <textarea
        className='NoteText'
        onChange={(e) =>
          onUpdate(note.id, {
            text: e.target.value
          })
        }
      />
    </div>
  )
}

export default Note