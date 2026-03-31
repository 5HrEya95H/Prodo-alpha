import { useEffect, useRef, createRef } from 'react'
import Note from './Note'

const Notes = ({ notes = [], setNotes = () => {} }) => {
  
  useEffect(()=>{
    //local storage logic
    const savedNotes = JSON.parse(localStorage.getItem('notes'))||[];

    const updatedNotes = notes.map((note)=>{
      const savedNote = savedNotes.find((n)=>n.id==note.id);
      if(savedNote){
        return {...note, position: savedNote.position}
      }
      else{
        const position = determineNewPosition();
        return{...note, position};
      }
    });

    setNotes(updatedNotes);
    localStorage.setItem("notes",JSON.stringify(updatedNotes));
  },[notes.length])
  
  const determineNewPosition= ()=>{
    const maxX= window.innerWidth-250;
    const maxY = window.innerHeight - 250;

    return {
      x: Math.floor(Math.random()*maxX),
      y: Math.floor(Math.random()*maxY),
    }
  }
  
  const noteRefs = useRef([]);

  const handleDragStart = (note, e) => {
  const { id } = note;
  const noteRef = noteRefs.current[id].current;

  const rect = noteRef.getBoundingClientRect();
  const offsetX = e.clientX - rect.left;
  const offsetY = e.clientY - rect.top;

  const handleMouseMove = (e) => {
    const newX = e.clientX - offsetX;
    const newY = e.clientY - offsetY;

    noteRef.style.left = `${newX}px`;
    noteRef.style.top = `${newY}px`;
  };

  const handleMouseUp = () => {
    document.removeEventListener("mousemove", handleMouseMove);
    document.removeEventListener("mouseup", handleMouseUp);

    const finalRect = noteRef.getBoundingClientRect();
    const newPosition = {
      x: finalRect.left,
      y: finalRect.top,
    };

    const updatedNotes = notes.map((n) =>
      n.id === id ? { ...n, position: newPosition } : n
    );

    setNotes(updatedNotes);
    localStorage.setItem("notes", JSON.stringify(updatedNotes));
  };

  document.addEventListener("mousemove", handleMouseMove);
  document.addEventListener("mouseup", handleMouseUp);
      
  }

  return (
    <div className='notes'>
      {notes.map((note) => {
        return (
          <Note
            key={note.id}
            content={note.text}
            initialPos={note.position}
            ref={noteRefs.current[note.id]
              ? noteRefs.current[note.id]
              : (noteRefs.current[note.id] = createRef())
            }
            onMouseDown={(e)=>{
              handleDragStart(note,e)
            }}
          />
        )
      })}
    </div>
  )
}

export default Notes