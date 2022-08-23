import { Sequelize } from "sequelize";
import { DATABASE_NAME, DATABASE_LOGIN, DATABASE_PASSWORD } from "./credentials";

const sequelize = new Sequelize(DATABASE_NAME, DATABASE_LOGIN, DATABASE_PASSWORD, {
    dialect: 'mysql',
    host: 'mysql://bd0b36e5e59b71:2cc932b8@us-cdbr-east-06.cleardb.net/heroku_37a8d607684161f?reconnect=true',
})

export default sequelize;