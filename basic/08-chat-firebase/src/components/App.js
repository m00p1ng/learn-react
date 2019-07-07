import React, { useEffect } from 'react';
import { Router, navigate } from '@reach/router';
import { connect } from 'react-redux';

import Home from './Home';
import Login from './Auth/Login';
import Register from './Auth/Register';
import Spinner from './Spinner';
import firebase from '../firebase';

import { setUser, clearUser } from '../actions'

import './App.css';

function App({ setUser, clearUser, isLoading }) {
  useEffect(() => {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        setUser(user)
        navigate('/')
      } else {
        clearUser()
        navigate('/login')
      }
    })
  }, [setUser, clearUser])

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
  { setUser, clearUser }
)(App);
