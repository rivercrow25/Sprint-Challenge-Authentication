const router = require('express').Router();
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const secret = require('../api/signature')

const db = require('./auth-model')

router.post('/register', (req, res) => {
  const hash = bcrypt.hashSync(req.body.password, 12)

  req.body.password = hash
  db.add(req.body)
    .then(user => {
      res.status(201).json(user)
    })
    .catch(err => {
      res.status(500).json({ err: err.message })
    })
});

router.post('/login', (req, res) => {
  const { username, password } = req.body

  db.findby({ username })
    .first()
    .then(found => {
      if (found && bcrypt.compareSync(password, found.password)) {
        const token = makeToken(found)
        res.status(200).json({ message: 'welcome', payload: token })
      } else {
        res.status(404).json({ message: 'no user with the given username or password found' })
      }
    })
    .catch(err => {
      res.status(500).json({ err: err.message })
    })
});

function makeToken(user) {
  const payload = {
    userid: user.id
  }
  const options = {
    expiresIn: '3h'
  }

  return jwt.sign(payload, secret.jwtSecrets, options)
}

module.exports = router;
