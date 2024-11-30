const express = require('express')
const sequelize = require('./config/database')
const authRoutes = require('./routes/auth')
const productRoutes = require('./routes/products')
const orderRoutes = require('./routes/order')
const swaggerDocs = require('./swagger/swagger')
const expressSession = require('express-session') // Подключаем express-session
const orderModel = require('./models/Order')
const { Op } = require('sequelize')
const exceljs = require('exceljs')

require('dotenv').config()

const app = express()
app.use(express.json())

// Настроим express-session только один раз
app.use(
  expressSession({
    secret: process.env.SESSION_SECRET || 'default_secret_key', // Указываем секрет для сессии
    resave: false,
    saveUninitialized: true
  })
)

// Асинхронный вызов для загрузки ES-модулей
;(async () => {
  const AdminJS = await import('adminjs').then(mod => mod.default)
  const AdminJSExpress = await import('@adminjs/express').then(
    mod => mod.default
  )
  const { Database, Resource } = await import('@adminjs/sequelize')

  // Регистрация адаптера
  AdminJS.registerAdapter({ Database, Resource })

  // Создание AdminJS панели
  const adminJs = new AdminJS({
    databases: [sequelize],
    rootPath: '/admin',
    branding: {
      logo: false, // Устанавливаем false, чтобы скрыть логотип
      companyName: 'Your Company' // Можно изменить название компании, если нужно
    },
    resources: [
      {
        resource: orderModel,
        options: {
          actions: {
            // Кастомное действие для генерации Excel отчета
            generateExcelReport: {
              actionType: 'resource',
              icon: 'View', // Иконка для кнопки
              label: 'Generate Excel Report', // Текст кнопки
              handler: async (request, response, context) => {
                console.log('Generating Excel report...')
                try {
                  // Получаем все заказы
                  const orders = await orderModel.findAll({
                    where: {
                      createdAt: {
                        [Op.gte]: new Date('2024-01-01') // Пример фильтрации
                      }
                    }
                  })

                  // Создаем новый Excel файл
                  const workbook = new exceljs.Workbook()
                  const worksheet = workbook.addWorksheet('Orders')

                  // Добавляем заголовки
                  worksheet.columns = [
                    { header: 'Order ID', key: 'id', width: 10 },
                    { header: 'Total Price', key: 'totalPrice', width: 20 },
                    { header: 'Status', key: 'status', width: 15 },
                    { header: 'User ID', key: 'userId', width: 10 },
                    { header: 'Created At', key: 'createdAt', width: 20 }
                  ]

                  // Добавляем данные в строки
                  orders.forEach(order => {
                    worksheet.addRow({
                      id: order.id,
                      totalPrice: order.totalPrice,
                      status: order.status,
                      userId: order.userId,
                      createdAt: order.createdAt.toLocaleString()
                    })
                  })

                  // Настроим заголовки для скачивания файла
                  response.setHeader(
                    'Content-Type',
                    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
                  )
                  response.setHeader(
                    'Content-Disposition',
                    'attachment; filename=orders_report.xlsx'
                  )

                  // Отправим файл пользователю
                  await workbook.xlsx.write(response)
                  response.end()
                } catch (error) {
                  console.error('Error generating report:', error)
                  response.status(500).send('Error generating report')
                }
              }
            }
          }
        }
      }
    ]
  })

  // Создаем роутер для AdminJS с сессиями
  const adminRouter = AdminJSExpress.buildAuthenticatedRouter(adminJs, {
    authenticate: async (email, password) => {
      return (
        email === process.env.ADMIN_EMAIL &&
        password === process.env.ADMIN_PASSWORD
      )
    },
    cookieName: 'adminjs',
    cookiePassword: process.env.JWT_SECRET // Это для cookie
  })

  // Добавляем роутер AdminJS
  app.use(adminJs.options.rootPath, adminRouter)
})()

// Роуты приложения
app.use('/auth', authRoutes)
app.use('/products', productRoutes)
app.use('/orders', orderRoutes)

// Инициализация Swagger
swaggerDocs(app)

// Запуск сервера
sequelize
  .sync()
  .then(() => {
    app.listen(5000, () => {
      console.log(`Server running on localhost:5000`)
    })
  })
  .catch(err => {
    console.error('Failed to sync database:', err)
  })
