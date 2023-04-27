const express = require('express')
const route = express.Router()
const Restaurant = require('../../models/restaurant')

route.get('/new', (req, res) => {
  res.render('new')
})

// create a new restaurant
route.post('', (req, res) => {
  const options = req.body
  options.userId = req.user._id
  Restaurant.create(options)
    .then(() => res.redirect('/'))
    .catch(err => console.error(err))
})

// browse a restaurant
route.get('/:id', (req, res) => {
  const _id = req.params.id
  const userId = req.user._id
  Restaurant.findOne({ _id, userId })
  .lean()
  .then(restaurant => res.render('detail', { restaurant }))
  .catch(err => console.error(err))
})

// edit a restaurant
route.get('/:id/edit', (req, res) => {
  const _id = req.params.id
  const userId = req.user._id
  Restaurant.findOne({ _id, userId })
  .lean()
  .then(options => res.render('edit', { options }))
  .catch(err => console.error(err))
})

// update a restaurant
route.put('/:id', (req, res) => {
  const _id = req.params.id
  const userId = req.user._id
  const options = req.body
  
  Restaurant.findOneAndUpdate({ _id, userId }, options)
    //可依照專案發展方向自定編輯後的動作，這邊是導向到瀏覽特定餐廳頁面
    .then(() => res.redirect(`/restaurants/${_id}`))
    .catch(err => console.log(err))
})

// delete a restaurant
route.delete('/:id', (req, res) => {
  const _id = req.params.id
  const userId = req.user._id
  Restaurant.findOne({ _id, userId })
    .then(restaurant => restaurant.remove())
    .then(() => res.redirect('/'))
    .catch(err => console.error(err))
})

module.exports = route