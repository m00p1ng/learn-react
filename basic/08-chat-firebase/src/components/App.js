import React from 'react';
import { Router } from '@reach/router';

import Home from './Home';
import Login from './Auth/Login';
import Register from './Auth/Register';

import './App.css';

function App() {
  return (
    <Router>
      <Home path="/" />
      <Login path="/login" />
      <Register path="/register" />
    </Router>
  );
}

export default App;
