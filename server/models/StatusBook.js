import { Sequelize } from 'sequelize' 
import sequelize from '../utils/database'

const StatusBook = sequelize.define('tbStatusReserva', {
    id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
    },
    status: {
        type: Sequelize.STRING,
        allowNull: false,
    },
}).sync()

export default StatusBook