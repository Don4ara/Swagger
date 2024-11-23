const { Sequelize } = require('sequelize')

const sequelize = new Sequelize(
  'postgres://root:root@localhost:54321/database_lab',
  {
    dialect: 'postgres',
    logging: false
  }
)

module.exports = sequelize
