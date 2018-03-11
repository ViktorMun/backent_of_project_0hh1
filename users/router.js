const Router = require('express').Router
const Users = require('./model')
const bcrypt = require('bcrypt')
const secret = require('../jwt').secret
const sign = require('../jwt').sign

const router = new Router()

const requireUser = (req, res, next) => {
  if (req.user) next();
  else
    res.status(401).send({
      message: "Please login"
    });
};
router.put('/users/:id', requireUser, (req, res) => {
    const usersId = Number(req.params.id)
    const updates =  {
			info: req.body.preferences,
		}
Users.findById(req.params.id)
    .then(entity => {
      if (entity) {
        return entity.update(updates);
      } else {
        res.status(404);
        res.json({ message: "User not found, can't update." });
      }
    })
    .then(final => {
      // return update
      res.status(200);
      res.send(final);
    })
    .catch(error => {
      res.status(500);
      res.json({
        message: "There was an error. No update."
      });
    });
})

router.post('/users',requireUser, (req, res) => {
  const user = {
    name: req.body.name,
    password: bcrypt(req.body.password, 10)
  }

  Users
  .create(user)
    .then(entity => {
      res.status(201)
      res.json({
        id: entity.id,
        name: entity.name
      })
    })
    .catch(err => {
      res.status(422)
      res.json({ message: err.message })
    })
  })

  router.post('/login',(req, res) => {
    const user = {
      name: req.body.name,
      password: bcrypt.hashSync(req.body.password, 10)
    }

    Users
  	.findOne({
  		where: {
  			name: req.body.name
  		}
  	})
  	.then(entity => {
  		if (bcrypt.compareSync(req.body.password, entity.password)) {
  			res.send({
  				jwt: sign(entity.id),
          message: "correct"
  			})
  		}
  		else {
  			res.status(400).send({
  				message: 'Password was incorrect'
  			})
  		}
  	})
  	.catch(err => {
  		console.error(err)
  		res.status(500).send({
  			message: 'Something went wrong'
  		})
  	})
  })

  router.delete('/users/:id', requireUser, (req, res) => {
    const userId = Number(req.params.id)
    Users.findById(req.params.id)
    .then(entity => {
      return entity.destroy()
    })
    .then(_ => {
      res.send({
        message: 'The user was deleted succesfully'
      })
    })
    .catch(error => {
      res.status(500).send({
        message: `Something went wrong`,
        error
      })
    })
  })


router.get('/secret', (req, res) => {
	if (req.user) {
		res.send({
			message: `Welcome, you should be the user with email ${req.user.email}`
		})
	}
	else {
		res.status(401).send({
			message: 'Please login!'
		})
	}
})




module.exports = router
