
const getConfig = () => {
  switch (process.env.NODE_ENV) {
    case 'development':
      return {
        apiUrl: 'http://localhost:3000'

      }
    case 'production':
      return {
        apiUrl: 'http://46.101.91.79'
      }
    default:
      return {}
  }
}

module.exports = getConfig()
