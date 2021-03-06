import { frontApiCall } from '../utils/frontApi'

export const list = (dispatch) => {
  dispatch({ type: 'LOADING' })
  return frontApiCall(dispatch, 'movies', 'LIST_FETCHED')
}
export const historyList = (dispatch) => {
  dispatch({ type: 'LOADING' })
  const entries = JSON.parse(window.localStorage.getItem('history')) || []
  dispatch({ type: 'LIST_FETCHED', data: { body: { entries } } })
}
export const mountComponents = (dispatch, start, end) => {
  let index
  dispatch({ type: 'LOADING' })
  if (end) {
    for (index = start; index < end; index++) {
      dispatch({ type: 'SET_MOVIE', index, dispatch })
    }
  } else {
    dispatch({ type: 'SET_MOVIE', index: start, dispatch })
  }
}

export const loadedMovie = (dispatch) => {
  dispatch({ type: 'LOADED_IMAGE' })
}
