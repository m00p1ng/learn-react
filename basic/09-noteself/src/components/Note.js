import React from 'react'

const style = {
  margin: '1.5rem',
  padding: '1rem',
}

const Note = ({ note }) => (
  <div className="card" style={style}>
    <p>{note.text}</p>
  </div>
)

export default Note