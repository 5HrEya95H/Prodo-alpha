import React, { useState } from 'react'
import Clock from './components/Clock'
import NewNotes from './components/NewNotes'

const App = () => {

  const [notes, setNotes] = useState(() => {
    const saved = localStorage.getItem("notes");
    return saved ? JSON.parse(saved) : [];
  });

  return (
    <div>
      {/* <Clock/> */}
      <NewNotes notes={notes} setNotes={setNotes}/>
    </div>
  )
}

export default App