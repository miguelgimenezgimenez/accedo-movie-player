const backApiCall = require('../utils/backApiCall')

const list = async () => {
  const movies = await backApiCall('https://sela-test.herokuapp.com/assets/hkzxv.json')
  return movies
}
module.exports = { list }
