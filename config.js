
const getConfig = () => {
  switch (process.env.NODE_ENV) {
    case 'development':
      return {
        apiUrl: 'http://localhost:3000'

      }
    case 'production':
      return {
        apiUrl: 'https://localhost:3000'

      }
    case 'test':
      return {
        apiUrl: 'http://localhost:3000'
      }
    default:
      return {}
  }
}

module.exports = getConfig()
