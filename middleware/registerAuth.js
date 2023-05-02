const { validationResult } = require('express-validator')
const bcrypt = require('bcryptjs')
const User = require('../models/user')

module.exports = registerAuth = (req, res) => {
  const { name, email, password, confirmPassword } = req.body
  let errors = validationResult(req) // 從請求中提取所有錯誤訊息，並將回傳的 Result 物件存在 errors 變數中
  
  // console.log('errors = ', errors)
  if (!errors.isEmpty()) { // 如果有錯誤訊息＝驗證失敗
    // 顯示驗證失敗的代號 422，渲染註冊頁面、錯誤訊息，並保留原本的使用者輸入
    return res.status(422).render('register', {
      errorMessages: errors.array(),
      name, email, password, confirmPassword
    })
  }
  // 如果沒有錯誤訊息＝驗證成功，新增一筆使用者 Document 到 users collection 中
  User.findOne({ email })
    .then(user => {
      if (user) {
        errors = [{ msg: 'The email is already existed !' }]
        // error.message = 'The email is already existed !'
        return res.render('register', { name, email, password, confirmPassword, errorMessages: errors })
      }

      return bcrypt
        .genSalt(10)
        .then(salt => bcrypt.hash(password, salt))
        .then(hash => {
          User.create({ name, email, password: hash })
            .then(() => res.redirect('/'))
            .catch(err => console.log(err))
        })
        .catch(err => console.log(err))
    })
    .catch(err => console.log(err))
}
