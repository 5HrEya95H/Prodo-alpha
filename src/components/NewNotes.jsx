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


    const handleDragStart = (note, e) => {
        e.preventDefault();

        const offsetX = e.clientX - note.position.x - 5;
        const offsetY = e.clientY - note.position.y - 5;

        const handleMouseMove = (e) => {
            const newX = e.clientX - offsetX;
            const newY = e.clientY - offsetY;

            setNotes(prev =>
            prev.map(n =>
                n.id === note.id
                ? { ...n, position: { x: newX, y: newY } }
                : n
            )
            );
        };

        window.addEventListener("mousemove", handleMouseMove);
        window.addEventListener("mouseup", () => {
            window.removeEventListener("mousemove", handleMouseMove);
        }, { once: true });
    };
    

  return (
    <div className='notes'>
      {notes.map((note) => {
        return (
          <Note
            note={note}
            key={note.id}
            content={note.text}
            initialPos={note.position}
            handleDragStart = {handleDragStart}
          />
        )
      })}
    </div>
  )
}

export default NewNotes