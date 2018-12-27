import React from 'react'
import { Link } from '@reach/router'

const Header = () => (
  <nav className="navbar is-success" role="navigation" aria-label="main navigation">
    <div className="navbar-brand">
      <Link to="/" className="navbar-item">
        Streamy
      </Link>
    </div>
    <div id="navbarBasicExample" class="navbar-menu">
      <div class="navbar-end">
        <Link to="/" className="navbar-item">
          All Stream
        </Link>
      </div>
    </div>
  </nav>
)

export default Header