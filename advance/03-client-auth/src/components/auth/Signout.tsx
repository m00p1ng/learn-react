import * as React from 'react'
import { connect } from 'react-redux'
import * as actions from '../../actions'

interface Props {
  signout(): void
}

class Signout extends React.Component<Props> {
  public componentDidMount() {
    this.props.signout()
  }

  public render() {
    return (
      <div>Sorry to see you go</div>
    )
  }
}

export default connect(null, actions)(Signout)
