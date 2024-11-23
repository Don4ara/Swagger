// controllers/orderController.js
const Order = require('../models/Order')

// Получение всех заказов
exports.getAllOrders = async (req, res) => {
  try {
    const orders = await Order.findAll()
    res.json(orders)
  } catch (err) {
    res
      .status(500)
      .json({ message: 'Ошибка при получении заказов', error: err.message })
  }
}

// Получение заказа по ID
exports.getOrderById = async (req, res) => {
  try {
    const order = await Order.findByPk(req.params.id)
    if (!order) {
      return res.status(404).json({ message: 'Заказ не найден' })
    }
    res.json(order)
  } catch (err) {
    res
      .status(500)
      .json({ message: 'Ошибка при получении заказа', error: err.message })
  }
}

// Создание нового заказа
exports.createOrder = async (req, res) => {
  const { totalPrice, userId, status } = req.body
  try {
    const order = await Order.create({ totalPrice, userId, status })
    res.status(201).json(order)
  } catch (err) {
    res
      .status(500)
      .json({ message: 'Ошибка при создании заказа', error: err.message })
  }
}

// Обновление заказа по ID
exports.updateOrder = async (req, res) => {
  const { totalPrice, status } = req.body
  try {
    const order = await Order.findByPk(req.params.id)
    if (!order) {
      return res.status(404).json({ message: 'Заказ не найден' })
    }
    order.totalPrice = totalPrice || order.totalPrice
    order.status = status || order.status
    await order.save()
    res.json(order)
  } catch (err) {
    res
      .status(500)
      .json({ message: 'Ошибка при обновлении заказа', error: err.message })
  }
}

// Удаление заказа по ID
exports.deleteOrder = async (req, res) => {
  try {
    const order = await Order.findByPk(req.params.id)
    if (!order) {
      return res.status(404).json({ message: 'Заказ не найден' })
    }
    await order.destroy()
    res.status(204).json()
  } catch (err) {
    res
      .status(500)
      .json({ message: 'Ошибка при удалении заказа', error: err.message })
  }
}
