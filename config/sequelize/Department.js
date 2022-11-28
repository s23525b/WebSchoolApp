const Sequelize = require('sequelize');
const sequelize = require('../../config/sequelize/sequelize');

const Department = sequelize.define('Department', {
    _id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    totalHours: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    description: {
        type: Sequelize.TEXT,
        allowNull: true,
        validate: {
            len: {
                args: [2, 3000]

            }
        }
    }
});

module.exports = Department;