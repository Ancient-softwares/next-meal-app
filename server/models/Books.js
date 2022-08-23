import { Sequelize } from 'sequelize';
import sequelize from '../utils/database';

const Books = sequelize.define('tbReservas', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
    },
    date: {
        type: Sequelize.DATE,
        allowNull: false,
    },
    time: {
        type: Sequelize.TIME,
        allowNull: false,
    },
    peopleNumber: {
        type: Sequelize.INTEGER,
        allowNull: false,
    },
    clientId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
            model: 'Client',
            key: 'id',
        },
    },
    restaurantID: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
            model: 'Restaurant',
            key: 'id',
        },
    },
    bookStatusID: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
            model: 'BookStatus',
            key: 'id',
        },
    },
    ratingID: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
            model: 'Rating',
            key: 'id',
        },
    },
}).sync();

export default Books;