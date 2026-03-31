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
        const savedNotes = JSON.parse(localStorage.getItem("notes")) || [];

        setNotes(prev =>
            prev.map(note => {
            const savedNote = savedNotes.find(n => n.id === note.id);

            if (savedNote) {
                return { ...note, ...savedNote }; // includes position, text, title
            } else {
                return {
                ...note,
                position: determineNewPosition(),
                };
            }
            })
        );
    }, []);

    useEffect(() => {
        localStorage.setItem("notes", JSON.stringify(notes));
    }, [notes]);

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