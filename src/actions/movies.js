import { apiCall } from '../utils/api'

export const list = (dispatch) => {
  dispatch({ type: 'LOADING' })
  const endpoint = ''
  return apiCall(dispatch, endpoint, 'LIST_FETCHED')
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
