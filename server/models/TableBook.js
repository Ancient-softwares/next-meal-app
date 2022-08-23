import { Sequelize } from 'sequelize'
import sequelize from '../utils/database'

const TableBook = sequelize.define('tbMesaReserva', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
    },
    tableID: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
            model: 'Table',
            key: 'id',
        },
    },
    bookID: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
            model: 'Book',
            key: 'id',
        },
    },
}).sync()

export default TableBook