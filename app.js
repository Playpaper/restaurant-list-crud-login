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

app.use(express.static("public"))
app.use(methodOverride("_method"))

// set body-parser
const bodyParser = require('body-parser')
const restaurant = require('./models/restaurant')
app.use(bodyParser.urlencoded({ extended: true }))

// set routes
app.get('/', (req, res) => {
  Restaurant.find()
    .lean()
    .then(restaurants => res.render('index', { restaurants }))
    .catch(err => console.error(err))
})

app.get('/restaurants/new', (req, res) => {
  res.render('new')
})

// create a new restaurant
app.post('/restaurants', (req, res) => {
  const options = req.body
  Restaurant.create(options)
  .then(() => res.redirect('/'))
  .catch(err => console.error(err))
})

// browse a restaurant
app.get('/restaurants/:id', (req, res) => {
  const id = req.params.id
  Restaurant.findById(id)
    .lean()
    .then(restaurant => res.render('detail', { restaurant }))
    .catch(err => console.error(err))
})

// edit a restaurant
app.get('/restaurants/:id/edit', (req, res) => {
  const id = req.params.id
  Restaurant.findById(id)
    .lean()
    .then(options => res.render('edit', { options }))
    .catch(err => console.error(err))
})

// update a restaurant
app.put('/restaurants/:id', (req, res) => {
  const id = req.params.id
  const options = req.body
  
  // Restaurant.findById(id)
  //   .then(restaurant => {
  //     restaurant.name = req.body.name
  //     restaurant.name_en = req.body.name_en
  //     restaurant.category = req.body.category
  //     restaurant.phone = req.body.phone
  //     restaurant.rating = req.body.rating
  //     restaurant.location = req.body.location
  //     restaurant.google_map = req.body.google_map
  //     restaurant.image = req.body.image
  //     restaurant.description = req.body.description
  //     restaurant.save()

  //     // restaurant.save(function (error) {
  //     //   if (error) { throw error };
  //     //   console.log('Yay, saved!');
  //     // });
  //   })
  
  // Restaurant.pre('save', function(next) {
  //   res.redirect(`/restaurants/${id}`)
  // })
  Restaurant.findByIdAndUpdate(id, options)
    //可依照專案發展方向自定編輯後的動作，這邊是導向到瀏覽特定餐廳頁面
    .then(() => res.redirect(`/restaurants/${id}`))
    .catch(err => console.log(err))
})

// delete a restaurant
app.delete('/restaurants/:id', (req, res) => {
  const id = req.params.id
  Restaurant.findById(id)
    .then(restaurant => restaurant.remove())
    .then(() => res.redirect('/'))
    .catch(err => console.error(err))
})

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

