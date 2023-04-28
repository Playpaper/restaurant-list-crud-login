const db = require('../../config/mongoose')
const Restaurant = require('../restaurant') // require Restaurant model
const User = require('../user')
const seedRestaurants = require('../../restaurant.json').results
const seedUsers = require('../../user.json')
const bcrypt = require('bcryptjs')

db.once('open', () => {

  Promise.all(
    seedUsers.map(seedUser => {
    bcrypt
      .genSalt(10)
      .then(salt => bcrypt.hash(seedUser.password, salt))
      .then(hash => {
        return User.create({ 
          name: seedUser.name,
          email: seedUser.email,
          password: hash
        })
        .catch(err => console.log(err))
      })
      .then(user => {
        console.log('user = ', user.email)
        const userRestaurants = seedUser.userRestaurants.map(item => {
          return Object.assign(seedRestaurants[item-1], {userId: user._id})
        })
        return userRestaurants
      })
      .then(userRestaurants => {
        return Restaurant.create(userRestaurants)
      })
    })
  )
  .then(() => {
    console.log('Done !')
    // process.exit()
  })
  .catch(err => console.log(err))
})
  


