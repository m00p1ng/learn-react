import React, { Component } from 'react';
import { Router } from "@reach/router"

import StreamCreate from './steams/StreamCreate'
import StreamEdit from './steams/StreamEdit'
import StreamDelete from './steams/StreamDelete'
import StreamList from './steams/StreamList'
import StreamShow from './steams/StreamShow'
import Header from './Header'

class App extends Component {
  render() {
    return (
      <>
        <Header />
        <div className="container">
          <Router>
            <StreamList path="/" />
            <StreamCreate path="/streams/new" />
            <StreamEdit path="/streams/edit" />
            <StreamDelete path="/streams/delete" />
            <StreamShow path="/streams/show" />
          </Router>
        </div>
      </>
    )
  }
}

export default App;
