import Note from "./Note"
import { useState, useEffect, useRef, createRef} from 'react'

const NewNotes = ({notes, setNotes}) => {
    
    //local storage and positions
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

    // dragging
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
    
    //updatings -- not working
    const handleUpdate = (id, updatedFields) => {
        setNotes(prev =>
            prev.map(note =>
            note.id === id
                ? { ...note, ...updatedFields }
                : note
            )
        );
        console.log(updatedFields)
    };


    //toggling elements

    const [toggleNote, setToggleNote] = useState(true);


  return (
    <div className='notes'>
      {notes.map((note) => {
        return (
            <div>
                {toggleNote && <Note
                    note={note}
                    handleDragStart = {handleDragStart}
                    onUpdate={handleUpdate}
                />}
                <button onClick={()=>setToggleNote(!toggleNote)}>Toggle notes</button>
            </div>
        )
      })}
    </div>
  )
}

export default NewNotes