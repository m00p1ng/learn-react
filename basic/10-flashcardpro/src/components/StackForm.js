import React, { Component } from 'react'
import { Link } from '@reach/router'
import { addStack } from '../actions'
import { connect } from 'react-redux';

export class StackForm extends Component {
  state = {
    title: '',
    cards: [],
  }

  addCard = () => {
    const { cards } = this.state

    this.setState({
      cards: [
        ...cards,
        {
          id: cards.length,
          prompt: '',
          answer: '',
        }
      ]
    })
  }

  updateCardPart = (event, index, part) => {
    const { cards } = this.state;
    cards[index][part] = event.target.value
    this.setState({ cards })
  }

  addStack = (event) => {
    event.preventDefault()
    this.props.addStack(this.state)
  }

  render() {
    return (
      <div>
        <Link to="/">Home</Link>
        <h4 className="title is-4">
          Create a New Stack
        </h4>
        <br />
        <div className="row">
          <div className="columns is-centered">
            <div className="column is-half">
              <form onSubmit={this.addStack}>
                <div className="field">
                  <div className="control">
                    <label className="label">Title:</label>
                    <input
                      type="text"
                      className="input"
                      onChange={(event) => {
                        this.setState({ title: event.target.value })
                      }}
                    />
                  </div>
                </div>
                {this.state.cards.map((card, index) => (
                  <div key={card.id} className="field">
                    <br />
                    <div className="control">
                      <label className="label">Prompt:</label>
                      <input
                        type="text"
                        className="input"
                        onChange={(event) => {
                          this.updateCardPart(event, index, 'prompt')
                        }}
                      />
                    </div>
                    <div className="control">
                      <label className="label">Answer:</label>
                      <input
                        type="text"
                        className="input"
                        onChange={(event) => {
                          this.updateCardPart(event, index, 'answer')
                        }}
                      />
                    </div>
                  </div>
                ))}
                <div className="buttons is-centered">
                  <button
                    className="button"
                    type="button"
                    onClick={this.addCard}
                  >
                    Add Card
                  </button>

                  <button
                    className="button is-info"
                    type="submit"
                  >
                    Save and Add the Stack
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default connect(null, { addStack })(StackForm)