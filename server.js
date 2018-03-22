const express = require('express')

const app = express()
const bodyParser = require('body-parser')

// const routes = require('./routes')

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.use(express.static('public'))

app.use('/', (req, res) => res.render('./index.html'))

app.listen(3000, () => {
  // eslint-disable-next-line
  console.log('Express running on http://localhost:3000')
})
