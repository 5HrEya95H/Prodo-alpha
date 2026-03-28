import Note from './Note'

const Notes = ({ notes = [], setNotes = () => {} }) => {
  return (
    <div>
      {notes.map((note) => {
        return (
          <Note
            key={note.id}
            content={note.text}
          />
        )
      })}
    </div>
  )
}

export default Notes