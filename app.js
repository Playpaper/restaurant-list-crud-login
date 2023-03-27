// require express from node_modules
const express = require('express')
// require handlebars from express-handlebars
const exphbs = require('express-handlebars')
// require mongoose
const mongoose = require('mongoose')
// require Restaurant model
const Restaurant = require('./models/restaurant')

const app = express()
const port = 3000

// database connection
if(process.env.NODE_ENV !== 'production'){
  require('dotenv').config()
}
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
const db = mongoose.connection

db.on('error', () => console.log('mongodb error !'))
db.once('open', () => console.log('mongodb connected !'))

// set template engine
app.engine('hbs', exphbs({
  defaultLayout: 'main',
  extname: '.hbs'
}))
app.set('view engine', 'hbs')

app.use(express.static("public"))

// set body-parser
const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: true }))

// set routes
app.get('/', (req, res) => {
  Restaurant.find()
    .lean()
    .then(restaurants => res.render('index', { restaurants }))
    .catch(error => console.error(error))
})

app.get('/restaurants/new', (req, res) => {
  res.render('new')
})

app.post('/restaurants/new', (req, res) => {
  //console.log(req.body)
  Restaurant.create( req.body )
    .then(() => res.redirect('/'))
    .catch(error => console.error(error))
})

app.get('/restaurants/:id', (req, res) => {
  const id = req.params.id

  Restaurant.findById(id)
    .lean()
    .then(restaurant => res.render('detail', { restaurant }))
    .catch(error => console.error(error))
})

// start and listen the server
app.listen(port, () => {
  console.log(`The express server is listening on http://localhost:${port}`)
})