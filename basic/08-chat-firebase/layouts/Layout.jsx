import React from 'react'

const Header = () => (
  <p>Header New</p>
)

const Layout = ({ children }) => (
  <div>
    <Header />
    <Header />
    {children}
  </div>
)

export default Layout
