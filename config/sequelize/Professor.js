const Sequelize = require('sequelize');
const sequelize = require('../../config/sequelize/sequelize');

const Professor = sequelize.define('Professor', {
    _id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    firstName: {
        type: Sequelize.STRING,
        allowNull: false
    },
    lastName: {
        type: Sequelize.STRING,
        allowNull: false
    },
    email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
    },
    specialization: {
        type: Sequelize.STRING,
        allowNull: true
    }
});

module.exports = Professor;