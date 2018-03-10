const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const db = require('./models')

const port = process.env.PORT || 3030

const app = express()
  .use(cors())
  .use(bodyParser.json())

const { Games } = db
const { User } = db

app.post('/games', (req, res) => {
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
// app.get('/players', (req, res) => {
//   const players = Player
//     .findAll()
//     .then((players) => {
//       res.json(players)
//     })
//     .catch((err) => {
//       console.error(err)
//       res.status(500)
//       res.json({ message: 'Oops! There was an error getting the players. Please try again' })
//     })
// })

app.get('/games/:id', (req, res) => {
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

app.patch('/games/:id', (req, res) => {
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

app.listen(port, () => {
  console.log(`
Server is listening on ${port}.

Open http://localhost:${port}

to see the app in your browser.
    `)
})
