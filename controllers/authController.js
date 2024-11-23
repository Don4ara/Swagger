const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const User = require('../models/User')
require('dotenv').config()

exports.login = async (req, res) => {
  const { username, password } = req.body
  try {
    const user = await User.findOne({ where: { username } })
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ message: 'Неверные учетные данные' })
    }

    const token = jwt.sign({ id: user.id }, process.env.SECRET_KEY, {
      expiresIn: '1h'
    })
    res.json({ token })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

exports.register = async (req, res) => {
  const { username, password } = req.body
  try {
    const existingUser = await User.findOne({ where: { username } })
    if (existingUser) {
      return res
        .status(400)
        .json({ message: 'Пользователь с таким именем уже существует' })
    }
    const hashedPassword = await bcrypt.hash(password, 10)
    const newUser = await User.create({ username, password: hashedPassword })

    res.status(201).json({
      id: newUser.id,
      username: newUser.username,
      message: 'Пользователь успешно зарегистрирован'
    })
  } catch (error) {
    res
      .status(500)
      .json({ message: 'Ошибка при регистрации', error: error.message })
  }
}
