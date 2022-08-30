/* const DB_CONNECTION = process.env['DB_CONNECTION'];
const DB_HOST = process.env['DB_HOST'];
const DB_PORT = process.env['DB_PORT'];
const DB_DATABASE = process.env['DB_DATABASE'];
const DB_USERNAME = process.env['DB_USERNAME'];
const DB_PASSWORD = process.env['DB_PASSWORD']; */

const DB_CONNECTION = 'mysql'
const DB_HOST = '127.0.0.1'
const DB_PORT = '3306'
const DB_DATABASE = 'nextMeal'
const DB_USERNAME = 'root'
const DB_PASSWORD = ''

module.exports = { DB_CONNECTION, DB_PORT, DB_DATABASE, DB_USERNAME, DB_PASSWORD, DB_HOST };