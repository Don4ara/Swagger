const express = require('express')
const {
  getAllProducts,
  createProduct,
  deleteProduct,
  updateProduct,
  getProductById
} = require('../controllers/productController')
const authenticate = require('../middleware/authenticate')
const router = express.Router()

/**
 * @swagger
 * tags:
 *   name: Products
 *   description: Управление продуктами
 */

/**
 * @swagger
 * /products:
 *   get:
 *     summary: Получение списка всех продуктов
 *     tags: [Products]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Список продуктов
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
 *                   name:
 *                     type: string
 *                     example: "Эспрессо"
 *                   price:
 *                     type: number
 *                     example: 150.0
 *       401:
 *         description: Пользователь не авторизован
 */

/**
 * @swagger
 * /products:
 *   post:
 *     summary: Создание нового продукта
 *     tags: [Products]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: "Капучино"
 *               price:
 *                 type: number
 *                 example: 200.0
 *     responses:
 *       201:
 *         description: Продукт успешно создан
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   example: 2
 *                 name:
 *                   type: string
 *                   example: "Капучино"
 *                 price:
 *                   type: number
 *                   example: 200.0
 *       401:
 *         description: Пользователь не авторизован
 */

/**
 * @swagger
 * /products/{id}:
 *   get:
 *     summary: Получение продукта по ID
 *     tags: [Products]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID продукта
 *         schema:
 *           type: integer
 *           example: 1
 *     responses:
 *       200:
 *         description: Продукт найден
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   example: 1
 *                 name:
 *                   type: string
 *                   example: "Эспрессо"
 *                 price:
 *                   type: number
 *                   example: 150.0
 *       404:
 *         description: Продукт не найден
 *       401:
 *         description: Пользователь не авторизован
 */

/**
 * @swagger
 * /products/{id}:
 *   put:
 *     summary: Обновление продукта по ID
 *     tags: [Products]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID продукта
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
 *               name:
 *                 type: string
 *                 example: "Латте"
 *               price:
 *                 type: number
 *                 example: 180.0
 *     responses:
 *       200:
 *         description: Продукт успешно обновлен
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   example: 1
 *                 name:
 *                   type: string
 *                   example: "Латте"
 *                 price:
 *                   type: number
 *                   example: 180.0
 *       404:
 *         description: Продукт не найден
 *       401:
 *         description: Пользователь не авторизован
 */

/**
 * @swagger
 * /products/{id}:
 *   delete:
 *     summary: Удаление продукта по ID
 *     tags: [Products]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID продукта
 *         schema:
 *           type: integer
 *           example: 1
 *     responses:
 *       204:
 *         description: Продукт успешно удален
 *       404:
 *         description: Продукт не найден
 *       401:
 *         description: Пользователь не авторизован
 */

router.get('/', authenticate, getAllProducts) // Получение всех продуктов
router.post('/', authenticate, createProduct) // Создание нового продукта
router.get('/:id', authenticate, getProductById) // Получение продукта по ID
router.put('/:id', authenticate, updateProduct) // Обновление продукта по ID
router.delete('/:id', authenticate, deleteProduct) // Удаление продукта по ID

module.exports = router
