import * as React from 'react'
import { connect } from 'react-redux'
import { Link, Route } from 'react-router-dom'

import CommentBox from './CommentBox'
import CommentList from './CommentList'

import * as actions from '../actions'

interface Props {
  auth: boolean
  changeAuth(isLoggedIn: boolean): void
}

class App extends React.Component<Props, {}> {
  public renderButton() {
    const handleSignIn = () => this.props.changeAuth(true)
    const handleSignOut = () => this.props.changeAuth(false)

    if (this.props.auth) {
      return (
        <button
          onClick={handleSignOut}>
          Sign Out
        </button>
      )
    } else {
      return (
        <button
          onClick={handleSignIn}>
          Sign In
        </button>)
    }
  }

  public renderHeader() {
    return (
      <ul>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/post">Post a comment</Link></li>
        <li>{this.renderButton()}</li>
      </ul>
    )
  }

  public render() {
    return (
      <div>
        {this.renderHeader()}
        <Route path="/post" component={CommentBox} />
        <Route path="/" exact={true} component={CommentList} />
      </div>
    )
  }
}

function mapStateToProps(state: any) {
  return { auth: state.auth }
}

export default connect(mapStateToProps, actions)(App)
