import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import { Router } from '@reach/router'
import rootReducer from './reducers'

import App from './components/App';
import Stack from './components/Stack'
import StackForm from './components/StackForm'

import 'bulma'
import './index.css'

const store = createStore(rootReducer)
store.subscribe(() => console.log('store', store.getState()))

ReactDOM.render(
  <Provider store={store}>
    <div className="container has-text-centered">
      <Router>
        <App path="/" />
        <Stack path="/stack" />
        <StackForm path="/stack_form" />
      </Router>
    </div>
  </Provider>,
  document.getElementById('root')
);