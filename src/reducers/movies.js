import Movie from '/molecules/Movie'
import React from 'react'

const INITIAL_STATE = {
  list: [],
  loading: false,
  movieComponents: [],
  loadingImages: 0,
  loadedImages: 0
}
const setLoading = (state, loading) => ({ ...state, loading })

const setLoadedImage = (state) => {
  const loadedImages = state.loadedImages + 1
  return ({ ...state, loadedImages })
}
const setMoviesList = (state, list) => ({ ...state, list, movieComponents: new Array(list.length) })

const setMovie = (state, index, dispatch) => {
  const loadingImages = state.loadingImages + 1
  const movie = state.list[index]
  if (state.movieComponents[index]) return ({ ...state, loading: false })
  const movieComponents = [...state.movieComponents]
  movieComponents[index] = <Movie key={movie.id} {...movie} dispatch={dispatch} />
  return ({ ...state, movieComponents, loadingImages, loading: false })
}

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case 'LOADING':
      return setLoading(state, true)
    case 'LIST_FETCHED':
      return setMoviesList(state, action.data.entries)
    case 'LOADED_IMAGE':
      return setLoadedImage(state, action.index, action.dispatch)
    case 'SET_MOVIE':
      return setMovie(state, action.index, action.dispatch)
    default:
      return state
  }
}
