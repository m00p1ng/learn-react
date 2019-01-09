import React, { Component } from 'react'

export class Card extends Component {
  state = {
    reveal: false,
  }

  handleClickCard = () => {
    this.setState({ reveal: true })
  }

  render() {
    const { prompt, answer } = this.props.card
    const { reveal } = this.state

    return (
      <div
        className="card"
        onClick={this.handleClickCard}
      >
        <div className="card-content">
          <div className="card-prompt">
            <h4 className="title is-4">
              {prompt}
            </h4>
          </div>
          <div className="card-answer">
            <h4 className={`title is-4 ${reveal ? 'text-revealed' : 'text-hidden'}`}>
              {answer}
            </h4>
          </div>
        </div>
      </div>
    )
  }
}

export default Card
