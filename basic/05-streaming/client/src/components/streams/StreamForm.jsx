import React, { useState } from 'react'

function StreamForm({ onSubmit, initialValue = { title: '', description: '' } }) {
  const [title, setTitle] = useState(initialValue.title)
  const [description, setDescription] = useState(initialValue.description)

  const handleSubmit = (event) => {
    event.preventDefault()

    onSubmit({
      title,
      description,
    })
  }

  return (
    <form
      onSubmit={handleSubmit}
    >
      <div className="field">
        <div className="control">
          <label>Enter Title</label>
          <input
            className="input"
            type="text"
            autoComplete="off"
            onChange={(event) => setTitle(event.target.value)}
            value={title}
          />
        </div>
      </div>

      <div className="field">
        <div className="control">
          <label>Enter Description</label>
          <input
            className="input"
            type="text"
            autoComplete="off"
            onChange={(event) => setDescription(event.target.value)}
            value={description}
          />
        </div>
      </div>

      <button className="button is-primary" type="submit">Submit</button>
    </form>
  )
}

export default StreamForm