import { Sequelize } from 'sequelize';
import sequelize from '../utils/database';

const Meal = sequelize.define('tbPrato', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
    },
    value: {
        type: Sequelize.INTEGER,
        allowNull: false,
    },
    value: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: false,
    },
    ingredients: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    photoMeal: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    typeMealID: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
            model: 'TypeMeal',
            key: 'id',
        },
    },
}).sync();

export default Meal;