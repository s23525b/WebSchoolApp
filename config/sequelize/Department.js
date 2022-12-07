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
        allowNull: false,
        unique: true,
        validate: {
            notEmpty: {
                msg: "Pole jest wymagane"
            },
            len: {
                args: [2, 60],
                msg: "Pole powinno zawierać od 2 do 60 znaków"
            },
        }
    },
    totalHours: {
        type: Sequelize.INTEGER,
        allowNull: false,
        validate: {
            notEmpty: {
                msg: "Pole jest wymagane"
            },
            isInt: {
                msg: "Pole powinno być liczbą"
            },
        }
    },
    description: {
        type: Sequelize.TEXT,
        allowNull: true,
        validate: {
            len: {
                args: [0, 3000],
                msg: "Pole pole powinno zawierać maksymalnie 3000 znaków"
            }
        }
    }
});

module.exports = Department;