import { Sequelize } from "sequelize";

export const DATABASE_NAME = process.env['DATABASE_NAME'];
export const DATABASE_LOGIN = process.env['DATABASE_LOGIN'];
export const DATABASE_PASSWORD = process.env['DATABASE_PASSWORD'];


const sequelize = new Sequelize(DATABASE_NAME, DATABASE_LOGIN, DATABASE_PASSWORD, {
    dialect: 'mysql',
    host: 'localhost',
})

export default sequelize;