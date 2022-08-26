import { Sequelize } from 'sequelize';
import sequelize from '../utils/database';

const Table = sequelize.define('tbMesa', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
    },
    seatsQuantity: {
        type: Sequelize.INTEGER,
        allowNull: false,
    },
    statusTable: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    restaurantID: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
            model: 'Restaurant',
            key: 'id',
        },
    },
    tableNumbers: {
        type: Sequelize.INTEGER,
        allowNull: false,
    },
}).sync();

export default Table;