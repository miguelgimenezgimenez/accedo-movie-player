import { createStore, applyMiddleware, combineReducers } from 'redux'
import reducers from './reducers'

const combinedReducers = combineReducers(reducers)

const logger = store => next => (action) => {
  const oldState = store.getState()
  const res = next(action)
  const newState = store.getState()
  if (process.env.NODE_ENV !== 'production') {
        console.info( // eslint-disable-line
      'Action dispatched', action,
      'Old state:', oldState,
      'New state:', newState
    )
  }
  return res
}

export default function (initialState) {
  return createStore(combinedReducers, initialState, applyMiddleware(logger))
}
