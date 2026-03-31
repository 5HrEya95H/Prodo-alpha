import React, { useState } from 'react'
import Notes from './components/Notes'
import Clock from './components/Clock'
import NewNotes from './components/NewNotes'

const App = () => {

  const [notes, setNotes] = useState([{
    id: 0,
    text: "aye this is note 1"
  },
  {
    id:1,
    text:"aye this is note 2"
  },
])

  return (
    <div>
      <Clock/>
      <NewNotes notes={notes} setNotes={setNotes}/>
    </div>
  )
}

export default App