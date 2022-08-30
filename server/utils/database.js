const Sequelize = require('sequelize')
const { DB_CONNECTION, DB_PASSWORD, DB_USERNAME, DB_DATABASE, DB_PORT, DB_HOST } = require("./credentials")

const connection = new Sequelize(DB_CONNECTION, DB_PASSWORD, DB_USERNAME, DB_DATABASE, DB_PORT, DB_HOST, {
    dialect: "mysql",
    host: '127.0.0.1',
    port: '3306',
    database: 'nextMeal',
    username: 'root',
    password: '',
    autoReconnect: true
})

module.exports = connection