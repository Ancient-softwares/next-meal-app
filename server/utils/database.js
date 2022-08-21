import { Sequelize } from "sequelize";
import { DATABASE_NAME, DATABASE_LOGIN, DATABASE_PASSWORD } from "./credentials";

const sequelize = new Sequelize(DATABASE_NAME, DATABASE_LOGIN, DATABASE_PASSWORD, {
    dialect: 'mysql',
    host: 'localhost',
})

export default sequelize;