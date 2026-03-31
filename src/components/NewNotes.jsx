import Note from "./Note"
import { useState, useEffect, useRef, createRef} from 'react'

const NewNotes = ({notes, setNotes}) => {

    const determineNewPosition= ()=>{
    const maxX= window.innerWidth-250;
    const maxY = window.innerHeight - 250;

    return {
      x: Math.floor(Math.random()*maxX),
      y: Math.floor(Math.random()*maxY),
        }
    }
    const position = determineNewPosition();

    useEffect(() => {
        if (notes.length === 0) return;

        const updatedNotes = notes.map(note => {
            if (!note.position) {
            return {
                ...note,
                position: determineNewPosition(),
            };
            }
            return note;
        });

        setNotes(updatedNotes);
    }, []);

  
    const noteRefs = useRef([]);

    const handleDragStart=(note,e)=>{
        const id = note.id;
        const noteRef = noteRefs.current[id].current;

        const offsetX = e.clientX - 5;
        const offsetY = e.clientY - 5;

        const handleMouseMove = (e) => {
            const newX = e.clientX - offsetX;
            const newY = e.clientY - offsetY;

            noteRef.style.left = `${newX}px`;
            noteRef.style.top = `${newY}px`;

            position.x = newX;
            position.y = newY;
        };

    }

  return (
    <div className='notes'>
      {notes.map((note) => {
        return (
          <Note
            key={note.id}
            content={note.text}
            initialPos={note.position}
          />
        )
      })}
    </div>
  )
}

export default NewNotes