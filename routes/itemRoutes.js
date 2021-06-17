const router = require('express').Router()
const { Item } = require('../models')
const passport = require('passport')

router.get('/items', passport.authenticate('jwt'), (req, res) => {
  res.json(req.user.items)
})

router.post('/items', passport.authenticate('jwt'), (req, res) => Item.create({
  text: req.body.text,
  isDone: req.body.isDone,
  uid: req.user.id
})
  .then(item => res.json(item))
  .catch(err => console.log(err)))

router.put('/items/:id', passport.authenticate('jwt'), (req, res) => Item.update(req.body, { where: { id: req.params.id } })
  .then(() => res.sendStatus(200))
  .catch(err => console.log(err)))

router.delete('/items/:id', passport.authenticate('jwt'), (req, res) => Item.destroy({ where: { id: req.params.id } })
  .then(() => res.sendStatus(200))
  .catch(err => console.log(err)))

module.exports = router
