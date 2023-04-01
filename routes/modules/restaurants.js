const express = require('express')
const route = express.Router()
const Restaurant = require('../../models/restaurant')

route.get('/new', (req, res) => {
  res.render('new')
})

// create a new restaurant
route.post('', (req, res) => {
  const options = req.body
  Restaurant.create(options)
    .then(() => res.redirect('/'))
    .catch(err => console.error(err))
})

// browse a restaurant
route.get('/:id', (req, res) => {
  const id = req.params.id
  Restaurant.findById(id)
    .lean()
    .then(restaurant => res.render('detail', { restaurant }))
    .catch(err => console.error(err))
})

// edit a restaurant
route.get('/:id/edit', (req, res) => {
  const id = req.params.id
  Restaurant.findById(id)
    .lean()
    .then(options => res.render('edit', { options }))
    .catch(err => console.error(err))
})

// update a restaurant
route.put('/:id', (req, res) => {
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
route.delete('/:id', (req, res) => {
  const id = req.params.id
  Restaurant.findById(id)
    .then(restaurant => restaurant.remove())
    .then(() => res.redirect('/'))
    .catch(err => console.error(err))
})

module.exports = route