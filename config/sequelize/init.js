const sequelize = require('./sequelize');

const Professor = require('../../config/sequelize/Professor');
const Department = require('../../config/sequelize/Department');
const Lecture = require('../../config/sequelize/Lecture');

module.exports = () => {
    Professor.hasMany(Lecture, {
        as: 'lectures',
        foreignKey: {name: 'prof_id', allowNull: false},
        constraints: true,
        onDelete: 'CASCADE'
    });
    Lecture.belongsTo(Professor, {
        as: 'professor',
        foreignKey: {name: 'prof_id', allowNull: false}
    });
    Department.hasMany(Lecture, {
        as: 'lectures',
        foreignKey: {name: 'dept_id', allowNull: false},
        constraints: true,
        onDelete: 'CASCADE'
    });
    Lecture.belongsTo(Department, {
        as: 'department',
        foreignKey: {name: 'dept_id', allowNull: false}
    });

    let allProfs, allDepts;
    return sequelize
        .sync({force: true})
        .then(() => {
            return Professor.findAll();
        })
        .then(profs => {
            if (!profs || profs.length === 0) {
                return Professor.bulkCreate([
                    {
                        firstName: 'Jan',
                        lastName: 'Kowalski',
                        email: 'jan.kowalski@utoronto.com',
                        specialization: null
                    },
                    {
                        firstName: 'Miroslaw',
                        lastName: 'Ogorek',
                        email: 'miroslaw.ogorek@utoronto.com',
                        specialization: null
                    }
                ])
                    .then(() => {
                        return Professor.findAll();
                    });
            } else {
                return profs;
            }
        })
        .then(profs => {
            allProfs = profs;

            return Department.findAll();
        })
        .then(depts => {
            if (!depts || depts.length === 0) {
                return Department.bulkCreate([
                    {name: 'Matematyka', totalHours: 240, description: 'Matematyka to krolowa nauk'},
                    {name: 'Informatyka', totalHours: 350, description: null},
                ])
                    .then(() => {
                        return Professor.findAll();
                    });
            } else {
                return depts;
            }
        })
        .then(depts => {
            allDepts = depts;
            return Lecture.findAll();
        })
        .then(lects => {
            if (!lects || lects.length === 0) {
                return Lecture.bulkCreate([
                    {
                        prof_id: 1,
                        dept_id: 2,
                        name: 'Matematyka Dyskretna',
                        dateFrom: '2022-11-14 12:40:00',
                        dateTo: '2022-11-14 14:00:00',
                        duration: 3
                    },
                    {
                        prof_id: 1,
                        dept_id: 1,
                        name: 'Budowa Komputerow',
                        dateFrom: '2022-11-15 12:40:00',
                        dateTo: '2022-11-15 14:00:00',
                        duration: 1
                    },
                    {
                        prof_id: 2,
                        dept_id: 2,
                        name: 'Algorytmika',
                        dateFrom: '2022-11-16 12:40:00',
                        dateTo: '2022-11-14 16:00:00',
                        duration: 2
                    }
                ]);
            } else {
                return lects;
            }
        });

};