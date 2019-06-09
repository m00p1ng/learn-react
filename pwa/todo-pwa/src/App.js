import React, { useState, useEffect } from 'react';
import logo from './logo.svg'
import './App.css'

function App() {
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [todoItem, setTodoItem] = useState('')

  useEffect(() => {
    (async () => {
      const response = await fetch('http://localhost:8000/items')
      const items = await response.json()
      setItems(items)
      setLoading(false)
    })()
  }, [])

  const addItem = async (event) => {
    event.preventDefault()

    const response = await fetch('http://localhost:8000/items', {
      method: 'POST',
      body: JSON.stringify({ item: todoItem }),
      headers: {
        'Content-Type': 'application/json',
      },
    })
    const items = await response.json()
    setItems(items)
    setTodoItem('')
  }

  const deleteItem = async (id) => {
    const response = await fetch('http://localhost:8000/items', {
      method: 'DELETE',
      body: JSON.stringify({ id }),
      headers: {
        'Content-Type': 'application/json',
      },
    })
    const items = await response.json()
    setItems(items)
  }

  return (
    <div className="App">
      <nav className="navbar navbar-light bg-light">
        <span className="navbar-barnd mb-0 h1">
          <img src={logo} className="App-logo" alt="logo" />
          Todo List
        </span>
      </nav>

      <div className="px-3 py2">
        <form className="form-inline my-3" onSubmit={addItem}>
          <div className="form-group mb-2 p-0 pr-3 col-8 col-sm-10">
            <input
              className="form-control col-12"
              placeholder="What do you need to do?"
              value={todoItem}
              onChange={event => setTodoItem(event.target.value)}
              type="text"
            />
          </div>
          <button
            type="submit"
            className="btn btn-primary mb-2 col-4 col-sm-2"
          >
            Add
          </button>
        </form>

        {loading && (<p>Loading...</p>)}

        {!loading && items.length === 0 && (
          <div className="alert alert-secondary">
            No items - all done!
          </div>
        )}

        {!loading && items && (
          <table className="table table-striped">
            <tbody>
              {items.map((item, i) => (
                <tr key={item.id} className="row">
                  <td className="col-1">{i + 1}</td>
                  <td className="col-10">{item.item}</td>
                  <td className="col-1">
                    <button
                      type="button"
                      className="close"
                      aria-label="Close"
                      onClick={() => deleteItem(item.id)}
                    >
                      <span aria-hidden="true">&times;</span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

export default App;
