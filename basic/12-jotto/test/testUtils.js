import { createStore, applyMiddleware } from 'redux'

import rootReducer from '../src/reducers'
import { middlewares } from '../src/configureStore'

/**
 * Create a testing store with imported reducers, middleware, and initial state.
 * globals: rootReducer, middlewares.
 * @function storeFactory
 * @param {object} initialState - Initial state for store.
 * @returns {Store} - Redux store.
 */
export const storeFactory = (initialState) => {
  const createStoreWithMiddleware = applyMiddleware(...middlewares)(createStore)
  return createStore(rootReducer, initialState)
}

/**
 * Return ShallowWrapper containing node(s) with the given data-test value.
 * @param {ShallowWrapper} wrapper - Enzyme shallow wrapper to search within.
 * @param {string} val - Value of data-test attribute for search.
 * @returns {ShallowWrapper }
 */
export const findByTestAttr = (wrapper, val) => {
  return wrapper.find(`[data-test='${val}']`)
}
