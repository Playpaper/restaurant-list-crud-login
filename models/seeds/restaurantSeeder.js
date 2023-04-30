const db = require('../../config/mongoose')
const Restaurant = require('../restaurant') // require Restaurant model
const User = require('../user')
const seedRestaurants = require('../../restaurant.json').results
const seedUsers = require('../../user.json')
const bcrypt = require('bcryptjs')

db.once('open', () => {

  Promise.all(
    seedUsers.map(seedUser => {
    return bcrypt
      .genSalt(10)
      .then(salt => bcrypt.hash(seedUser.password, salt))
      .then(hash => {
        return User.create({ 
          name: seedUser.name,
          email: seedUser.email,
          password: hash
        })
        .catch(console.error)
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
          .catch(console.error)
      })
      .then((data) => data.length) // 每位使用著寫進DB的餐廳筆數
      .catch(console.error)
    })
  )
  .then((data) => {
    console.log(data)
    console.log('Done !')
  })
  .catch(console.error)
  .finally(() => {
    process.exit() // 強制中斷 process 
    // db.close() // 正常關連線
  })
})
  


