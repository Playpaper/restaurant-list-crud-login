const express= require('express')
const router = express.Router()
const Restaurant = require('../../models/restaurant')
// require filterRestaurant
const filterRestaurants = require('../../filterRestaurants.js')

// search restaurants
router.get('/', (req, res) => {
  const { keyword, category, rating } = req.query
  let { kind, sort } = req.query
  const objSort = {}

  // 可能會沒有帶 query string
  kind = kind ? kind : 'name'
  sort = sort ? sort : 'asc'

  objSort[kind] = sort

  Restaurant.find()
    .lean()
    .sort(objSort)
    .then(restaurants => {
      const filteredData = filterRestaurants(restaurants, keyword, category, rating)
      res.render('index', {
        restaurants: filteredData ? filteredData : restaurants,
        keyword,
        category,
        rating,
        kind,
        sort
      })
    })
    .catch(err => console.error(err))
})

module.exports = router