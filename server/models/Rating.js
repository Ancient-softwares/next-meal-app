import { Sequelize } from 'sequelize';
import sequelize from '../utils/database';

const Rating = sequelize.define('tbAvalicao', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
    },
    rating: {
        type: Sequelize.FLOAT,
        allowNull: false,
    },
    description: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    date: {
        type: Sequelize.DATE,
        allowNull: false,
    }
}).sync();

export default Rating;