
const request = require('request')

const backApiCall = url =>
  new Promise((resolve, reject) => {
    request(url, { json: true }, (err, res, body) => {
      if (err) reject(new Error(`API CALL ERROR ${err}`))
      resolve(res)
    })
  })
module.exports = backApiCall
