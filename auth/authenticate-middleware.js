const secret = require('../api/signature')
const jwt = require('jsonwebtoken')

module.exports = (req, res, next) => {
  jwt.verify(req.headers.authorization, secret.jwtSecrets, function (err, decoded) {
    if (err) {
      res.status(400).json({ error: 'not logged in' })
    } else {
      req.token = decoded
      next()
    }
  })
};
