import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from '@reach/router'
import stacks from '../data/stacks.json'
import { setStack, loadStacks } from '../actions'

class StackList extends Component {
  componentDidMount() {
    if (this.props.stacks.length === 0) {
      this.props.loadStacks(stacks);
    }
  }

  render() {
    return (
      <div>
        {this.props.stacks.map(stack => (
          <h4
            className="title is-4"
            key={stack.id}
            onClick={() => this.props.setStack(stack)}
          >
            <Link to="/stack">
              {stack.title}
            </Link>
          </h4>
        ))}
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  stacks: state.stacks
})

export default connect(
  mapStateToProps,
  { setStack, loadStacks }
)(StackList)