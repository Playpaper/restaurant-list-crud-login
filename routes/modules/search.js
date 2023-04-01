const express= require('express')
const router = express.Router()
const Restaurant = require('../../models/restaurant')
// require filterRestaurant
const filterRestaurants = require('../../filterRestaurants.js')

// search restaurants
router.get('/', (req, res) => {
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

module.exports = router