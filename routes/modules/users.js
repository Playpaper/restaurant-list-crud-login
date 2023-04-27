const express = require('express')
const router = express.Router()
const User = require('../../models/user')
const passport = require('passport')

router.get('/login', (req, res) => {
  res.render('login')
})

router.get('/register', (req, res) => {
  res.render('register')
})

router.post('/register', (req, res) => {
  const { name, email, password, confirmPassword} = req.body
  let error = {}

  if (password !== confirmPassword ) {
    error.message = 'password and confirmPassword are not match !'
    return res.render('register', { name, email, password, confirmPassword, error })
  }

  User.findOne({ email })
    .then(user => {
      if (user) {
        error.message = 'The email is already existed !'
        return res.render('register', { name, email, password, confirmPassword, error })
      }
      return User.create({ name, email, password })
        .then(() => res.redirect('/'))
        .catch(err => console.log(err))
    })
    .catch(err => console.log(err))
})

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

module.exports = router