const jwt = require('jsonwebtoken')
require('dotenv').config()

module.exports = (req, res, next) => {
  const token = req.headers['authorization']
  if (!token) return res.status(401).json({ message: 'Unauthorized' })

  try {
    const decoded = jwt.verify(token.split(' ')[1], process.env.SECRET_KEY)
    req.user = decoded
    next()
  } catch (error) {
    res.status(403).json({ message: 'Invalid token' })
  }
}
