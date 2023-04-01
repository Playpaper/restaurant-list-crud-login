const db = require('../../config/mongoose')
const Restaurant = require('../restaurant') // require Restaurant model
const restaurantList = require('../../restaurant.json')

db.once('open', () => {
  restaurantList.results.forEach(item => {
    Restaurant.create(item)
      .catch(error => console.error(error))
  })
  console.log('done!')
})

