import React, { useEffect } from 'react';
import { Router, navigate } from '@reach/router';
import { connect } from 'react-redux';

import Home from './Home';
import Login from './Auth/Login';
import Register from './Auth/Register';
import Spinner from './Spinner';
import firebase from '../firebase';

import { setUser } from '../actions'

import './App.css';

function App({ setUser, isLoading }) {
  useEffect(() => {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        setUser(user)
        navigate('/')
      }
    })
  }, [])

  return isLoading
    ? <Spinner />
    : (
      <Router>
        <Home path="/" />
        <Login path="/login" />
        <Register path="/register" />
      </Router>
    );
}

const mapStateToProps = (state) => {
  return {
    isLoading: state.user.isLoading,
  }
}

export default connect(
  mapStateToProps,
  { setUser }
)(App);
