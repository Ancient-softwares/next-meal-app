import { Sequelize } from "sequelize";
import { DB_CONNECTION, DB_PASSWORD, DB_USERNAME, DB_DATABASE, DB_PORT, DB_HOST } from "./credentials";

const sequelize = new Sequelize(DB_CONNECTION, DB_PASSWORD, DB_USERNAME, DB_DATABASE, DB_PORT, DB_HOST, {
    dialect: DB_CONNECTION,
    host: DB_HOST,
    port: DB_PORT,
    database: DB_DATABASE,
    username: DB_USERNAME,
    password: DB_PASSWORD,
    autoReconnect: true
})

export default sequelize;