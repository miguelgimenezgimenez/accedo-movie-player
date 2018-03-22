const express = require('express')
const exphbs = require('express-handlebars')

const app = express()
const bodyParser = require('body-parser')

// const routes = require('./routes')

app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.use(express.static('public'))

app.use('/', (req, res) => res.render('./index.html'))

app.listen(3000, () => {
  // eslint-disable-next-line
  console.log('Express running on http://localhost:3000')
})
