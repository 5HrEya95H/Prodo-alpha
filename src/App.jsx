import React, { useState } from 'react'
import Notes from './components/Notes'

const App = () => {

  const [notes, setNotes] = useState([{
    id: 1,
    text: "aye this is note 1"
  },
  {
    id:2,
    text:"aye this is note 2"
  },
])

  return (
    <div>
      <Notes notes={notes} setNotes={setNotes}/>
    </div>
  )
}

export default App