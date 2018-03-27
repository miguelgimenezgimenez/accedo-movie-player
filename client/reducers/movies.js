
const INITIAL_STATE = {
  error: null,
  list: [],
  loading: false,
  loadingImages: 0,
  loadedImages: 0,
  mountedComponents: []
}
const setError = (state, error) => ({ ...state, error, loading: false })

const setLoading = (state, loading) => ({ ...state, loading })

const setLoadedImage = (state) => {
  const loadedImages = state.loadedImages + 1
  return ({ ...state, loadedImages })
}
const setMoviesList = (state, list) => ({ ...state, list, mountedComponents: new Array(list.length) })

const setMovie = (state, index, dispatch) => {
  const loadingImages = state.loadingImages + 1
  const movie = state.list[index]
  if (!movie) return setError(state, `MOVIE NOT IN LIST FOR INDEX ${index}`)
  if (state.mountedComponents[index]) return ({ ...state, loading: false })
  const mountedComponents = [...state.mountedComponents]
  mountedComponents[index] = movie
  return ({ ...state, mountedComponents, loadingImages, loading: false })
}

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case 'LOADING':
      return setLoading(state, true)
    case 'LIST_FETCHED':
      return setMoviesList(state, action.data.body.entries)
    case 'LOADED_IMAGE':
      return setLoadedImage(state, action.index, action.dispatch)
    case 'SET_MOVIE':
      return setMovie(state, action.index, action.dispatch)
    default:
      return state
  }
}
