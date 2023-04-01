// require express from node_modules
const express = require('express')
// require handlebars from express-handlebars
const exphbs = require('express-handlebars')
// require method-override
const methodOverride = require("method-override")
// require routes
const routes = require('./routes')
// require mongoose
require('./config/mongoose')

const app = express()
const port = 3000

// set template engine
app.engine('hbs', exphbs({
  defaultLayout: 'main',
  extname: '.hbs'
}))
app.set('view engine', 'hbs')

app.use(express.static('public'))
app.use(methodOverride('_method'))

// set body-parser
const bodyParser = require('body-parser')

app.use(bodyParser.urlencoded({ extended: true }))
app.use(routes)

// start and listen the server
app.listen(port, () => {
  console.log(`The express server is listening on http://localhost:${port}`)
})

