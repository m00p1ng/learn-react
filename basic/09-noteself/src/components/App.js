import React, { Component } from 'react';

import Note from './Note'
import { bake_cookie, read_cookie, delete_cookie } from 'sfcookies'

import 'bulma'

const cookie_key = 'NOTES'

class App extends Component {
  state = {
    text: '',
    notes: [],
  }

  componentDidMount() {
    this.setState({ notes: read_cookie(cookie_key) })
  }

  handleSubmit = (event) => {
    event.preventDefault()

    const { notes, text } = this.state
    notes.push({ text })

    if (text !== '') {
      this.setState({
        text: '',
        notes,
      })

      bake_cookie(cookie_key, notes)
    }
  }

  handleOnInputChange = (event) => {
    this.setState({
      text: event.target.value
    })
  }

  handleClearNote = () => {
    delete_cookie(cookie_key)

    this.setState({
      notes: [],
    })
  }

  render() {
    const { notes, text } = this.state
    return (
      <div className="container has-text-centered">
        <div className="row ">
          <div className="columns is-centered">
            <div className="column is-half">
              <h2 className="title">
                Note to Self
              </h2>
              <form onSubmit={this.handleSubmit}>
                <div className="field">
                  <div className="control">
                    <input
                      className="input has-text-centered"
                      type="text"
                      value={text}
                      onChange={this.handleOnInputChange}
                    />
                  </div>
                </div>
                <div className="buttons is-centered">
                  <button
                    className="button is-info"
                    type="submit"
                  >
                    Submit
                  </button>
                  <button
                    className="button is-danger"
                    type="button"
                    onClick={this.handleClearNote}
                  >
                    Clear Notes
                  </button>
                </div>
              </form>
              {notes.map((note, i) => (
                <Note key={i} note={note} />
              ))}
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default App
