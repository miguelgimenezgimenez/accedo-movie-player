const express = require('express')
const cons = require('consolidate')
const routes = require('./routes')
const path = require('path')

const app = express()

app.engine('html', cons.swig)
// view engine setup
app.set('view engine', 'html')
const bodyParser = require('body-parser')

app.set('views', path.join(__dirname, 'views'))

app.use(express.static('public'))

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.use('/api', routes)
app.use('/', (req, res) => res.render('index.html'))

app.listen(3000, () => {
  // eslint-disable-next-line
  console.log('Express running on http://localhost:3000')
})
