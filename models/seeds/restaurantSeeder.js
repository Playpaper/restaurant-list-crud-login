const mongoose = require('mongoose')
const Restaurant = require('../restaurant') // require Restaurant model
const restaurantList = require('../../restaurant.json')
if(process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})

const db = mongoose.connection

db.on('error', () => console.log(`MONGODB error !`))
db.once('open', () => {
  console.log(`MONGODB connected!`)
  restaurantList.results.forEach(item => {
    Restaurant.create(item)
      .catch(error => console.error(error))
  })
  console.log('done!')
})