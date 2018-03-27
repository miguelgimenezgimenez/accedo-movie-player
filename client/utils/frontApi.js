import { apiUrl } from '../../config'

export const frontApiCall = (dispatch, endpoint, type) =>
  fetch(`${apiUrl}/api/${endpoint}`)
    .then(response => response.json())
    .then((data) => {
      if (data.error) throw new Error(data.error)
      dispatch({ type, data })
    })
    .catch((error) => {
      dispatch({ type: 'ERROR', error })
    })
