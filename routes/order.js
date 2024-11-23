// routes/orderRoutes.js
const express = require('express')
const {
  getAllOrders,
  createOrder,
  getOrderById,
  updateOrder,
  deleteOrder
} = require('../controllers/orderController')
const authenticate = require('../middleware/authenticate') // Для проверки аутентификации
const router = express.Router()

/**
 * @swagger
 * tags:
 *   name: Orders
 *   description: Управление заказами
 */

/**
 * @swagger
 * /orders:
 *   get:
 *     summary: Получение списка всех заказов
 *     tags: [Orders]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Список заказов
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                     example: 1
 *                   totalPrice:
 *                     type: number
 *                     example: 300.0
 *                   status:
 *                     type: string
 *                     example: "pending"
 *                   userId:
 *                     type: integer
 *                     example: 1
 *       401:
 *         description: Пользователь не авторизован
 */

/**
 * @swagger
 * /orders:
 *   post:
 *     summary: Создание нового заказа
 *     tags: [Orders]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               totalPrice:
 *                 type: number
 *                 example: 300.0
 *               userId:
 *                 type: integer
 *                 example: 1
 *               status:
 *                 type: string
 *                 example: "pending"
 *     responses:
 *       201:
 *         description: Заказ успешно создан
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   example: 1
 *                 totalPrice:
 *                   type: number
 *                   example: 300.0
 *                 status:
 *                   type: string
 *                   example: "pending"
 *                 userId:
 *                   type: integer
 *                   example: 1
 *       401:
 *         description: Пользователь не авторизован
 */

/**
 * @swagger
 * /orders/{id}:
 *   get:
 *     summary: Получение заказа по ID
 *     tags: [Orders]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID заказа
 *         schema:
 *           type: integer
 *           example: 1
 *     responses:
 *       200:
 *         description: Заказ найден
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   example: 1
 *                 totalPrice:
 *                   type: number
 *                   example: 300.0
 *                 status:
 *                   type: string
 *                   example: "pending"
 *                 userId:
 *                   type: integer
 *                   example: 1
 *       404:
 *         description: Заказ не найден
 *       401:
 *         description: Пользователь не авторизован
 */

/**
 * @swagger
 * /orders/{id}:
 *   put:
 *     summary: Обновление заказа по ID
 *     tags: [Orders]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID заказа
 *         schema:
 *           type: integer
 *           example: 1
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               totalPrice:
 *                 type: number
 *                 example: 350.0
 *               status:
 *                 type: string
 *                 example: "completed"
 *     responses:
 *       200:
 *         description: Заказ успешно обновлен
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   example: 1
 *                 totalPrice:
 *                   type: number
 *                   example: 350.0
 *                 status:
 *                   type: string
 *                   example: "completed"
 *                 userId:
 *                   type: integer
 *                   example: 1
 *       404:
 *         description: Заказ не найден
 *       401:
 *         description: Пользователь не авторизован
 */

/**
 * @swagger
 * /orders/{id}:
 *   delete:
 *     summary: Удаление заказа по ID
 *     tags: [Orders]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID заказа
 *         schema:
 *           type: integer
 *           example: 1
 *     responses:
 *       204:
 *         description: Заказ успешно удален
 *       404:
 *         description: Заказ не найден
 *       401:
 *         description: Пользователь не авторизован
 */

router.get('/', authenticate, getAllOrders) // Получение всех заказов
router.post('/', authenticate, createOrder) // Создание нового заказа
router.get('/:id', authenticate, getOrderById) // Получение заказа по ID
router.put('/:id', authenticate, updateOrder) // Обновление заказа по ID
router.delete('/:id', authenticate, deleteOrder) // Удаление заказа по ID

module.exports = router
