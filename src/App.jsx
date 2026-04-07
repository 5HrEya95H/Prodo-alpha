import React, { useState } from 'react'
import Clock from './components/Clock'
import NewNotes from './components/NewNotes'
import Journal from './components/Journal';
import Inventory from './components/Inventory';

const App = () => {

  const [notes, setNotes] = useState(() => {
    const saved = localStorage.getItem("notes");
    return saved ? JSON.parse(saved) : [];
  });

  return (
    <div className='Home'>
     <Clock/>
     <Inventory component={<Journal/>}/>
    </div>
  )
}

export default App