import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { BrowserRouter, Route } from 'react-router-dom'
import { applyMiddleware, createStore } from 'redux'
import createSagaMiddleware from 'redux-saga'

import App from './components/App'
import Signin from './components/auth/Signin'
import Signout from './components/auth/Signout'
import Signup from './components/auth/Signup'
import Feature from './components/Feature'
import Welcome from './components/Welcome'
import reducers from './reducers'
import rootSaga from './sagas'

const sagaMiddleware = createSagaMiddleware()
const store = createStore(
  reducers,
  {
    auth: {
      authenticated: localStorage.getItem('token') as any,
    },
  },
  applyMiddleware(sagaMiddleware),
)
sagaMiddleware.run(rootSaga)

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <App>
        <Route path="/" exact={true} component={Welcome} />
        <Route path="/feature" component={Feature} />
        <Route path="/signup" component={Signup} />
        <Route path="/signout" component={Signout} />
        <Route path="/signin" component={Signin} />
      </App>
    </BrowserRouter>
  </Provider>,
  document.getElementById('root') as HTMLElement,
)
