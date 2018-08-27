import * as React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import './HeaderStyle.css'

interface Props {
  authenticated: boolean
}

class Header extends React.Component<Props> {
  public renderLinks() {
    if (this.props.authenticated) {
      return (
        <div>
          <Link to="/signout">Sign Out</Link>
          <Link to="/feature">Feature</Link>
        </div>
      )
    } else {
      return (
        <div>
          <Link to="/signup">Sign Up</Link>
          <Link to="/signin">Sign In</Link>
        </div>
      )
    }
  }

  public render() {
    return (
      <div className="header">
        <Link to="/">Redux Auth</Link>
        {this.renderLinks()}
      </div>
    )
  }
}

function mapStateToProps(state: any) {
  return { authenticated: state.auth.authenticated }
}

export default connect(mapStateToProps)(Header)