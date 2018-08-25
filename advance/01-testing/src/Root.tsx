import * as React from 'react'
import { Provider } from 'react-redux'
import { applyMiddleware, createStore } from 'redux'
import createSagaMiddleware from 'redux-saga'

import reducers from './reducers'
import rootSaga from './sagas'

interface Props {
  children: React.ReactNode
  initialState?: any
}

const sagaMiddleware = createSagaMiddleware()

const root: React.SFC<Props> = ({ children, initialState = {} }) => {
  const store = createStore(
    reducers,
    initialState,
    applyMiddleware(sagaMiddleware),
  )
  sagaMiddleware.run(rootSaga)

  return (
    <Provider store={store} >
      {children}
    </Provider>
  )
}

export default root