const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const userRouter = require('./users/router')
const gamesRouter = require('./games/router')
const verify = require('./jwt').verify
const User = require('./users/model')

const app = express()
  .use(cors())
  .use(bodyParser.json())


const port = process.env.PORT || 4001



app.listen(port, () => {
  console.log(`
  Server is listening on ${port}.

  Open http://localhost:${port}.

  to see the app in your browser.
    `)
})


app.use(function (req, res, next) {
  if (!req.headers.authorization) return next()

  const auth = req.headers.authorization.split(' ')
  if (auth[0] === 'Bearer') {
    verify(auth[1], function (err, jwt) {
      if (err) {
        console.error(err)
        res.status(400).send({
          message: "JWT token invalid"
        })
      }
      else {
        User
          .findById(jwt.id)
          .then(entity => {
            req.user = entity
            next()
          })
          .catch(err => {
            console.error(err)
            res.status(500).send({
              message: 'Something went horribly wrong'
            })
          })
      }
    })
  }
  else next()
})



 app.use(userRouter)
app.use(gamesRouter)
