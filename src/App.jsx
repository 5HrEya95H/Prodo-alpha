import React, { useState } from 'react'
import Clock from './components/Clock'
import NewNotes from './components/NewNotes'
import WindowBox from './components/Journal';
import Journal from './components/Journal';
import Inventory from './components/Inventory';
import { BsJournal } from 'react-icons/bs';

const App = () => {

  const [notes, setNotes] = useState(() => {
    const saved = localStorage.getItem("notes");
    return saved ? JSON.parse(saved) : [];
  });

  return (
    <div className='Home'>
     <Clock/>  {/* 
      <NewNotes notes={notes} setNotes={setNotes}/>
   */}
        <Inventory component={<Journal/>}/>
      {/* <Journal className="inventoryBox"></Journal> */}
      {/* <Scheduler/> */}
    </div>
  )
}

export default App