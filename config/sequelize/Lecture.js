const Sequelize = require('sequelize');
const sequelize = require('../../config/sequelize/sequelize');

const Lecture = sequelize.define('Lecture', {
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
    dateFrom: {
        type: Sequelize.DATE,
        allowNull: false
    },
    dateTo: {
        type: Sequelize.DATE,
        allowNull: true
    },
    duration: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    prof_id: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    dept_id: {
        type: Sequelize.INTEGER,
        allowNull: false
    }
});

module.exports = Lecture;