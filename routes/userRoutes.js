const router = require('express').Router()
const { User } = require('../models')
const passport = require('passport')
const jwt = require('jsonwebtoken')

router.get('/users/facebook', passport.authenticate('facebook'))

router.get('/users/facebook/callback', passport.authenticate('facebook', { failureRedirect: '/login.html' }), (req, res) => {
  res.redirect(`/loading.html?token=${jwt.sign({ id: req.user.id }, process.env.SECRET)}`)
})

router.post('/users/register', (req, res) => {
  const { name, email, username } = req.body
  User.register(new User({ name, email, username }), req.body.password, err => {
    if (err) { console.log(err) }
    res.sendStatus(200)
  })
})

router.post('/users/login', (req, res) => {
  User.authenticate()(req.body.username, req.body.password, (err, user) => {
    if (err) { console.log(err) }
    res.json(user ? jwt.sign({ id: user.id }, process.env.SECRET) : null)
  })
})

module.exports = router
