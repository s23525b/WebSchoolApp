const Professor = require("../../config/sequelize/Professor");
const Department = require("../../config/sequelize/Department");
const Lecture = require("../../config/sequelize/Lecture");

exports.getProfessors = () => {
    return Professor.findAll();
}

exports.getProfessorsById = (profId) => {
    return Professor.findByPk(profId,
        {
            include: [{
                model: Lecture,
                as: 'lectures',
                include: [{
                    model: Department,
                    as: 'department',
                }]
            }]
        });
};

exports.createProfessor = (newProfData) => {
    return Professor.create({
        firstName: newProfData.firstName,
        lastName: newProfData.lastName,
        email: newProfData.email,
        specialization: newProfData.specialization
    });
};

exports.updateProfessor = (profId, profData) => {
    return Professor.update(profData, {
        where: {_id: profId}
    });
};

exports.deleteProfessor = (profId) => {
    return Professor.destroy({
        where: {_id: profId}
    });
};