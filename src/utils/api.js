import movies from '../../movies.json'

export const apiCall = (dispatch, endpoint, type) =>
  // fetch(`${apiUrl}${endpoint}`, options)
  //   .then(response => response.json())
  getMovies()
    .then((data) => {
      if (data.error) throw new Error(data.error)
      dispatch({ type, data })
    })
    .catch((error) => {
      dispatch({ type: 'ERROR', error })
    })
export function getMovies () {
  return Promise.resolve(movies)
}
