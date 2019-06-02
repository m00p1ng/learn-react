import React from 'react';
import { Router } from "@reach/router"

import StreamCreate from './streams/StreamCreate'
import StreamEdit from './streams/StreamEdit'
import StreamDelete from './streams/StreamDelete'
import StreamList from './streams/StreamList'
import StreamShow from './streams/StreamShow'
import Header from './Header'

function App() {
  return (
    <>
      <Header />
      <div className="container">
        <Router>
          <StreamList path="/" />
          <StreamCreate path="/streams/new" />
          <StreamEdit path="/streams/edit/:id" />
          <StreamDelete path="/streams/delete/:id" />
          <StreamShow path="/streams/:id" />
        </Router>
      </div>
    </>
  )
}

export default App;
