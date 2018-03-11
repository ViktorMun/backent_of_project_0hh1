const Router = require('express').Router
const Games = require('./model')

const router = new Router()

const requireUser = (req, res, next) => {
	if (req.user) next()
	else res.status(401).send({
		message: 'Please login'
	})
}

router.post('/games',requireUser, (req, res) => {
  const game = req.body

  Games.create(game)
    .then(entity => {
      res.status(201)
      res.json(entity)
  })
    .catch(err => {
      res.status(422)
      res.json({ message: err.message })
    })
  })

  router.get('/games/:id',requireUser, (req, res) => {
    const game = Games
      .findById(req.params.id)
      .then((games) => {
        if (games) {
          res.json(games)
        } else {
          res.status(404)
          res.json({ message: 'Game not found!' })
        }
      })
      .catch((err) => {
        console.error(err)
        res.status(500)
        res.json({ message: 'Oops! There was an error getting the game. Please try again' })
      })
  })

  router.patch('/games/:id',requireUser, (req, res) => {
    const game = Games
      .findById(req.params.id)
      .then((games) => {
        if (games) {
          games.board = req.body.board
          games
            .save()
            .then((updatedG) => {
              res.json(updatedG)
            })
            .catch((err) => {
              res.status(422)
              res.json({ message: err.message })
            })
        } else {
          res.status(404)
          res.json({ message: 'Game not found!' })
        }
      })
      .catch((err) => {
        console.error(err)
        res.status(500)
        res.json({ message: 'Oops! There was an error getting the game. Please try again' })
      })
  })

  module.exports = router
