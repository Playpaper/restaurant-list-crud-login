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
app.post('/restaurants/new', (req, res) => {
  Restaurant.create( req.body )
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
    .then(restaurant => res.render('edit', { restaurant }))
    .catch(err => console.error(err))
})

// update a restaurant
app.put('/restaurants/:id', (req, res) => {
  const id = req.params.id
  Restaurant.findByIdAndUpdate(id, req.body)
    //可依照專案發展方向自定編輯後的動作，這邊是導向到瀏覽特定餐廳頁面
    .then(() => res.redirect(`/restaurants/${id}`))
    .catch(err => console.log(err))
})

// delete a restaurant
app.delete('/restaurants/:id', (req, res) => {
  const id = req.params.id
  console.log('delete')
  Restaurant.findById(id)
    .then(restaurant => restaurant.remove())
    .then(() => res.redirect('/'))
    .catch(err => console.error(err))
})

// search restaurants
app.get('/search', (req, res) => {
  // const keyword = req.query.keyword.trim()
  const { keyword, category, rating } = req.query
  // res.render('index', { keyword, category, rating })
  Restaurant.find()
    .lean()
    .then(restaurants => {
      const filteredData = filterRestaurants(restaurants, keyword, category, rating)
      console.log('filter')
      res.render('index', { 
        restaurants: filteredData ? filteredData : restaurants, 
        keyword 
      })
    })
    .catch(err => console.error(err))

  // Restaurant.find()
  //   .lean()
  //   .then(restaurantsData => {
  //     const restaurants = restaurantsData.filter(item => item.name.toLowerCase().includes(keyword.toLowerCase()) || item.category.includes(keyword) || item.rating >= Number(keyword))

  //     // Restaurant category
  //     const category = getRestaurantCategory(restaurantsData)
  //     res.render('index', { restaurants, keyword, category })
  //   })
  
  // filtered "name" or "category" which is included keyword or "rating" which is >= keyword
  
})

// app.get("/search", (req, res) => {
//   const { keyword, category, rating } = req.query;
//   Restaurant.find()
//     .lean()
//     .then((restaurants) => {
//       const filterData = filterRestaurants(
//         restaurants,
//         keyword,
//         category,
//         rating
//       );
//       let notFound = filterData.length ? false : true;
//       res.render("index", {
//         restaurants: filterData,
//         keyword: keyword,
//         category: category,
//         rating: rating,
//         notFound: notFound,
//       });
//     });
// });

function getRestaurantCategory(list) {
  const aryCategory = []

  list.forEach(item => {
    if (!aryCategory.includes(item.category)) {
      aryCategory.push(item.category)
    }
  })
  return aryCategory
}
//搜尋結果的route
// router.get("/search", (req, res) => {
//   const keyword = req.query.keyword.trim().toLowerCase();
//   const sortBy = req.query.sortBy || "_id";
//   Restaurant.find()
//     .lean()
//     .sort(sortBy)
//     .then((restaurantsData) => {
//       let restaurants = restaurantsData.filter(
//         (restaurant) =>
//           restaurant.name.toLowerCase().includes(keyword) ||
//           restaurant.category.includes(keyword)
//       );
//       const noResults = restaurants.length === 0;
//       //如有搜尋到則維持原本的restaurant array, 沒有執行推薦3間餐廳的function
//       restaurants = restaurants.length
//         ? restaurants
//         : recommendRestaurants(restaurantsData);

//       res.render("index", { restaurants, keyword, noResults, sortBy });
//     })
//     .catch((e) => console.log(e));
// });


// start and listen the server
app.listen(port, () => {
  console.log(`The express server is listening on http://localhost:${port}`)
})

