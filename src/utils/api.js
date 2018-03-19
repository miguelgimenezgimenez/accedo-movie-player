// import fetchJsonp from 'fetch-jsonp'
// import jsonp from 'jsonp'

// export default () => {
//   jsonp('https://sela-test.herokuapp.com/assets/hkzxv.json', null, (res) => {
//     console.log(res)
//   })
// //   fetchJsonp('https://sela-test.herokuapp.com/assets/hkzxv.json')
// //     .then((response) => {
// //       console.log(response)
// //       response.json()
// //     })
// //     .then((json) => {
// //       console.log('parsed json', json)
// //     }).catch((ex) => {
// //       console.log('parsing failed', ex)
// //     })
//   // payload is your post data
// //   const payload = { data: 'test' }
// //   const options = {
// //     method: 'POST',
// //     headers: {
// //       Accept: 'application/json',
// //       'Content-Type': 'application/json'
// //     },
// //     body: JSON.stringify(payload),
// //     cors: true, // allow cross-origin HTTP request
// //     credentials: 'same-origin' // This is similar to XHR’s withCredentials flag
// //   }

// //   // SEND REQUEST
// //   fetch('https://sela-test.herokuapp.com/assets/hkzxv.json', options).then((response) => {
// //     console.log(response)
// //     // TODO
// //   }).catch((error) => {
// //     console.log(error)
// //     // TODO
// //   })
// }

// function reqListener () {
//   console.log(this.responseText)
// }
// export const makeCall = () => {
//   const oReq = new XMLHttpRequest({ anon: true })
//   oReq.addEventListener('load', reqListener)
//   oReq.open('GET', 'https://sela-test.herokuapp.com/assets/hkzxv.json')
//   oReq.send()
// }
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
