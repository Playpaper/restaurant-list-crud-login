// require express from node_modules
const express = require('express')
const exphbs = require('express-handlebars')
const methodOverride = require("method-override")
const session = require('express-session')
const helpers = require("./public/javascripts/helpers");
const routes = require('./routes')
const bodyParser = require('body-parser')
const usePassport = require('./config/passport')
const flash = require('connect-flash')
require('./config/mongoose')

const app = express()
const port = 3000

// set template engine
app.engine('hbs', exphbs({
  defaultLayout: 'main',
  extname: '.hbs'
}))
app.set('view engine', 'hbs')
// 
app.use(session({
  secret: 'ThisIsMySecret',
  resave: false,
  saveUninitialized: true
}))

usePassport(app)
app.use(flash())
app.use((req, res, next) => {
  res.locals.isAuthenticated = req.isAuthenticated()
  res.locals.user = req.user
  res.locals.success_msg = req.flash('success_msg')
  res.locals.warning_msg = req.flash('warning_msg')
  res.locals.login_error = req.flash('error')
  next()
})
app.use(express.static('public'))
app.use(methodOverride('_method'))
app.use(bodyParser.urlencoded({ extended: true }))
app.use(routes)

// start and listen the server
app.listen(port, () => {
  console.log(`The express server is listening on http://localhost:${port}`)
})

