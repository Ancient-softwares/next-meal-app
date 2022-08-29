import { Sequelize } from 'sequelize';

import sequelize from '../utils/database';

const Client = sequelize.define('tbCliente', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
    }, 
    email: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    name: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    password: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    phone: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    address: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    city: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    state: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    country: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    street: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    streetNumber: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    photoClient: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    cep: {
        type: Sequelize.STRING,
        allowNull: false,
    },
}).sync();

export default Client