const express = require('express')
const router = express.Router()
const User = require('../../models/user')
const passport = require('passport')
const bcrypt = require('bcryptjs')
// register
const { body } = require('express-validator')
const registerAuth = require('../../middleware/registerAuth')

router.get('/login', (req, res) => {
  res.render('login')
})

router.get('/register', (req, res) => {
  res.render('register')
})

router.post('/register', [
  // body('name')
  //   .trim() // 去除空白的 Sanitizer
  //   .isLength({ min: 1 }) // 長度至少 > 0
  //   .withMessage('名字不可輸入空白 !'), // 驗證失敗的客製化訊息
  body('password') 
    .trim() 
    .isLength({ min: 5 }) 
    // .matches(/[-_$#]/)
    .withMessage('密碼長度至少需要5個字元 !'), 
  body('confirmPassword') 
    .trim() 
    .custom((confirmPassword, { req }) => { // 加入客製化驗證函式，並保留請求 req 做後續使用
      if (confirmPassword !== req.body.password) { // 確認密碼欄位的值需要和密碼欄位的值相符
        throw new Error('兩次輸入的密碼不相同') // 驗證失敗時的錯誤訊息
      }
      return true // 成功驗證回傳 true
    })
], registerAuth)

// router.post('/register', (req, res) => {
//   const { name, email, password, confirmPassword} = req.body
//   let error = {}

//   if (password !== confirmPassword ) {
//     error.message = 'password and confirmPassword are not match !'
//     return res.render('register', { name, email, password, confirmPassword, error })
//   }

//   User.findOne({ email })
//     .then(user => {
//       if (user) {
//         error.message = 'The email is already existed !'
//         return res.render('register', { name, email, password, confirmPassword, error })
//       }

//       return bcrypt
//         .genSalt(10)
//         .then(salt => bcrypt.hash(password, salt))
//         .then(hash => {
//           User.create({ name, email, password: hash })
//             .then(() => res.redirect('/'))
//             .catch(err => console.log(err))
//         })
//         .catch(err => console.log(err))
//     })
//     .catch(err => console.log(err))
// })

router.post('/login', passport.authenticate('local', {
  successRedirect: '/',
  failureRedirect: '/users/login',
  failureFlash: true
}))

router.get('/logout', (req, res) => {
  req.logout()
  req.flash('success_msg', `You've logged out !`)
  res.redirect('/users/login')
})

router.get('/test', (req, res, next) => { 
  User.find()
    .then(() => {
      throw new Error('fake !')
    })
    .catch(next)  // -> 給處理 error middleware(若沒自己寫，expressjs 在最後有一個預設的)}
    .then((err) => {
      res.status(500)
      res.render('error', { error: err })
    })
})

module.exports = router