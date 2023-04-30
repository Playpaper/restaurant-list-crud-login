const express= require('express')
const router = express.Router()
const Restaurant = require('../../models/restaurant')
// const filterRestaurants = require('../../filterRestaurants.js')

// search restaurants
router.get('/', (req, res) => {
  const { keyword, category, rating } = req.query
  let { kind, sort } = req.query
  const objSort = {}
  const userId = req.user._id

  // 可能會沒有帶 query string
  kind = kind ? kind : 'name'
  sort = sort ? sort : 'asc'

  objSort[kind] = sort

  // 過濾一般不會把資料拿回來後再自己過濾，會直接下資料庫語法
  Restaurant.find({
    userId,
    name: keyword ? new RegExp(keyword.trim(), 'i') : { $regex: /.+/, $options: 'si' },
    category: (category === '所有分類') ? { $regex: /.+/, $options: 'si' } : category,
    rating:  {$gte: Number(rating)}
  })
  .lean()
  .sort(objSort)
  .then(restaurants => {
    res.render('index', {
      restaurants,
      keyword,
      category,
      rating,
      kind,
      sort
    })
  })
  .catch(err => console.error(err))

  
  // Restaurant.find({ userId })
  //   .lean()
  //   .sort(objSort)
  //   .then(restaurants => {
  //     const filteredData = filterRestaurants(restaurants, keyword, category, rating)
  //     res.render('index', {
  //       restaurants: filteredData ? filteredData : restaurants,
  //       keyword,
  //       category,
  //       rating,
  //       kind,
  //       sort
  //     })
  //   })
  //   .catch(err => console.error(err))
})

module.exports = router