import React from 'react'
import { Link } from '@reach/router'
import { connect } from 'react-redux'
import Card from './Card'

const Stack = ({ title, cards }) => (
  <>
    <Link to="/">Home</Link>
    <h3 className="title">
      {title}
    </h3>
    <br />
    {cards.map(card => (
      <Card key={card.id} card={card} />
    ))}
  </>
)

const mapStateToProps = (state) => ({
  stack: state.stack
})

export default connect(mapStateToProps)(Stack)