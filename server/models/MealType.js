import { Sequelize } from 'sequelize';
import sequelize from '../utils/database';

const MealType = sequelize.define('tbTipoPrato', {
    id: {
        type: Sequelize.STRING,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
    },
    type: {
        type: Sequelize.STRING,
        allowNull: false,
    },
}).sync()

export default MealType