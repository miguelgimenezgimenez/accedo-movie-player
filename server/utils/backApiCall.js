
const request = require('request')

const backApiCall = url =>
  new Promise((resolve, reject) => {
    request(url, { json: true }, (err, res, body) => {
      if (err) reject(new Error(`API CALL ERROR ${err}`))
      console.log(body)
      resolve(res)
    })
  })
module.exports = backApiCall
