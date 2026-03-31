// import { useEffect, useRef, createRef } from 'react'
// import Note from './Note'

// const Notes = ({ notes = [], setNotes = () => {} }) => {
  
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
  
//   const determineNewPosition= ()=>{
//     const maxX= window.innerWidth-250;
//     const maxY = window.innerHeight - 250;

//     return {
//       x: Math.floor(Math.random()*maxX),
//       y: Math.floor(Math.random()*maxY),
//     }
//   }
  
//   const noteRefs = useRef([]);

//   const handleDragStart = (note, e) => {
//     const { id } = note;
//     const noteRef = noteRefs.current[id].current;
//     const rect = noteRef.getBoundingClientRect();
//     const offsetX = e.clientX - rect.left;
//     const offsetY = e.clientY - rect.top;

//     const startPos = note.position;

//     const handleMouseMove = (e) => {
//       const newX = e.clientX - offsetX;
//       const newY = e.clientY - offsetY;

//       noteRef.style.left = `${newX}px`;
//       noteRef.style.top = `${newY}px`;
//     };

//     const handleMouseUp = () => {
//       document.removeEventListener("mousemove", handleMouseMove);
//       document.removeEventListener("mouseup", handleMouseUp);

//       const finalRect = noteRef.getBoundingClientRect();
//       const newPosition = {
//         x: finalRect.left,        y: finalRect.top,
//       };

//       if(checkforOverlap(id)){
//         noteRef.style.left = `${startPos.x}px`;
//         noteRef.style.top = `${startPos.y}px`;
//       }
//       else{
//         updateNotePosition(id, newPosition);
//       }
    
//       // const updatedNotes = notes.map((n) =>
//       //   n.id === id ? { ...n, position: newPosition } : n
//       // );

//       // setNotes(updatedNotes);
//       // localStorage.setItem("notes", JSON.stringify(updatedNotes));
//     };

//     document.addEventListener("mousemove", handleMouseMove);
//     document.addEventListener("mouseup", handleMouseUp);
      
//   };

//   const checkforOverlap = (id)=>{
//     const currentNoteRef = noteRefs.current[id].current;
//     const currentrect = currentNoteRef.getBoundingClientRect();

//     return notes.some((note)=>{
//       if(note.id===id) return false;

//       const otherNoteRef = noteRefs.current[note.id].current;
//       const otherRect= otherNoteRef.getBoundingClientRect();

//       const overlap = !(
//         currentrect.right< otherRect.left || currentrect.left>otherRect.right ||
//         currentrect.bottom<otherRect.top || currentrect.top>otherRect.bottom 
//       );

//       return overlap;
//     })

//   }

//   const updateNotePosition = (id, newPosition) => {
//     const updatedNotes = notes.map((note) =>
//       note.id === id ? {...note, position: newPosition} : note
//     );
//     setNotes(updatedNotes);
//     localStorage.setItem("notes", JSON.stringify(updatedNotes));
//   };

//   return (
//     <div className='notes'>
//       {notes.map((note) => {
//         return (
//           <Note
//             key={note.id}
//             content={note.text}
//             initialPos={note.position}
//             ref={noteRefs.current[note.id]
//               ? noteRefs.current[note.id]
//               : (noteRefs.current[note.id] = createRef())
//             }
//             onMouseDown={(e)=>{
//               handleDragStart(note,e)
//             }}
//           />
//         )
//       })}
//     </div>
//   )
// }

// export default Notes