import React, { useState } from 'react'
import Clock from './components/Clock'
import NewNotes from './components/NewNotes'
import WindowBox from './components/Journal';
import Journal from './components/Journal';


const App = () => {

  const [notes, setNotes] = useState(() => {
    const saved = localStorage.getItem("notes");
    return saved ? JSON.parse(saved) : [];
  });

  return (
    <div>
      {/* <Clock/> 
      <NewNotes notes={notes} setNotes={setNotes}/>
        */}
      
      <Journal></Journal>
      
    </div>
  )
}

export default App