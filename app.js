const express = require('express')
const sequelize = require('./config/database')
const authRoutes = require('./routes/auth')
const productRoutes = require('./routes/products')
const swaggerDocs = require('./swagger/swagger')
const orderRoutes = require('./routes/order')

const app = express()
require('dotenv').config()

app.use(express.json())

app.use('/auth', authRoutes)
app.use('/products', productRoutes)
app.use('/orders', orderRoutes)

swaggerDocs(app)

sequelize.sync().then(() => {
  app.listen(5000, () => {
    console.log(`Server running on localhost:5000`)
  })
})
