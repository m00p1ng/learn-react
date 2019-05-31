import React from 'react'
import { Link } from '@reach/router'
import GoogleAuth from './GoogleAuth'

const Header = () => (
  <nav className="navbar is-success" role="navigation" aria-label="main navigation">
    <div className="navbar-brand">
      <Link to="/" className="navbar-item">
        Streamy
      </Link>
    </div>
    <div id="navbarBasicExample" className="navbar-menu">
      <div className="navbar-end">
        <Link to="/" className="navbar-item">
          All Stream
        </Link>
        <div className="navbar-item">
          <GoogleAuth />
        </div>
      </div>
    </div>
  </nav>
)

export default Header