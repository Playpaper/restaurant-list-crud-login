// require express from node_modules
const express = require('express')
// require handlebars from express-handlebars
const exphbs = require('express-handlebars')
// require mongoose
const mongoose = require('mongoose')
// require Restaurant model
const Restaurant = require('./models/restaurant')
// require method-override
const methodOverride = require("method-override")
// require filterRestaurant
const filterRestaurants = require('./filterRestaurants.js')
// require routes
const routes = require('./routes')
const app = express()
const port = 3000

// database connection
if(process.env.NODE_ENV !== 'production'){
  require('dotenv').config()
}
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false
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

app.use(express.static('public'))
app.use(methodOverride('_method'))

// set body-parser
const bodyParser = require('body-parser')
const restaurant = require('./models/restaurant')
app.use(bodyParser.urlencoded({ extended: true }))

// set routes
app.use(routes)

// search restaurants
app.get('/search', (req, res) => {
  const { keyword, category, rating } = req.query
  Restaurant.find()
    .lean()
    .then(restaurants => {
      const filteredData = filterRestaurants(restaurants, keyword, category, rating)
      res.render('index', { 
        restaurants: filteredData ? filteredData : restaurants, 
        keyword 
      })
    })
    .catch(err => console.error(err))
})

// start and listen the server
app.listen(port, () => {
  console.log(`The express server is listening on http://localhost:${port}`)
})

