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
                        specialization: 'Analiza matematyczna'
                    },
                    {
                        firstName: 'Miroslaw',
                        lastName: 'Ogorek',
                        email: 'miroslaw.ogorek@utoronto.com',
                        specialization: 'Procesy fizyczne'
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
                    {name: 'Matematyka', totalHours: 240, description: 'W trakcie studiów na kierunku matematyka studenci zdobywają wiedzę z zakresu klasycznych teorii i działów matematyki wyższej: teorii mnogości i logiki, analizy rzeczywistej (w tym rachunku różniczkowego i całkowego jednej i wielu zmiennych), geometrii z algebrą liniową, algebry, topologii, teorii miary i rachunku prawdopodobieństwa z elementami statystyki, równań różniczkowych zwyczajnych.'},
                    {name: 'Fizyka', totalHours: 350, description: 'W ramach wybranych przedmiotów na III roku można rozwijać się w jednej z dziedzin, w której specjalizują się wykładowcy. Są to m. in. : bazy danych, obliczenia równoległe i rozproszone, algorytmika, teoretyczne podstawy informatyki, biologia obliczeniowa, nowoczesne języki programowania, inżynieria oprogramowania, bezpieczeństwo systemów komputerowych i kryptografia.'},
                    {name: 'Informatyka', totalHours: 220, description: null},
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
                        dateTo: '2022-11-14 14:10:00',
                        duration: 90
                    },
                    {
                        prof_id: 1,
                        dept_id: 1,
                        name: 'Budowa Komputerow',
                        dateFrom: '2022-11-15 12:40:00',
                        dateTo: '2022-11-15 14:10:00',
                        duration: 90
                    },
                    {
                        prof_id: 2,
                        dept_id: 2,
                        name: 'Algorytmika',
                        dateFrom: '2022-11-16 12:40:00',
                        dateTo: '2022-11-16 16:00:00',
                        duration: 200
                    }
                ]);
            } else {
                return lects;
            }
        });

};