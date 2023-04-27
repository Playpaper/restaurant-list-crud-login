const express = require('express')
const router = express.Router()
const Restaurant = require('../../models/restaurant')

router.get('/', (req, res) => {
  let { kind, sort, category, rating } = req.query
  const objSort = {}
  const userId = req.user._id

  // 可能會沒有帶 query string
  kind = kind ? kind : 'name'
  sort = sort ? sort :'asc'
  
  objSort[kind] = sort
  Restaurant.find({ userId })
    .lean()
    .sort(objSort)
    .then(restaurants => res.render('index', { restaurants, kind, sort, category, rating }))
    .catch(err => console.error(err))
})

module.exports = router