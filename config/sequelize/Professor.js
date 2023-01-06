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
        allowNull: false,
        validate: {
            notEmpty: {
                msg: "Pole jest wymagane"
            },
            len: {
                args: [3, 30],
                msg: "Pole powinno zawierać od 3 do 30 znaków"
            },
        }
    },
    lastName: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            notEmpty: {
                msg: "Pole jest wymagane"
            },
            len: {
                args: [3, 50],
                msg: "Pole powinno zawierać od 3 do 50 znaków"
            },
        }
    },
    email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
        validate: {
            notEmpty: {
                msg: "Pole jest wymagane"
            },
            len: {
                args: [5, 50],
                msg: "Pole powinno zawierać od 5 do 50 znaków"
            },
            isEmail: {
                msg: 'Pole powinno zawierać prawidłowy adres email'
            }
        }
    },
    specialization: {
        type: Sequelize.STRING,
        allowNull: true
    },
    password: {
        type: Sequelize.STRING,
        allowNull: false
    }
});

module.exports = Professor;