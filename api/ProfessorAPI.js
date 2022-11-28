const ProfessorRepository = require('../repository/sequelize/ProfessorRepository');

exports.getProfessors = (req, res, next) => {
    ProfessorRepository.getProfessors()
        .then(profs => {
            res.status(200).json(profs);
        })
        .catch(err => {
            console.log(err)
        });
};

exports.getProfessorById = (req, res, next) => {
    const profId = req.params.profId;
    ProfessorRepository.getProfessorsById(profId)
        .then(profs => {
            if (!profs) {
                res.status(404).json({
                    message: 'Profesor with id: ' + profId + ' not found'
                })
            } else {
                res.status(200).json(profs);
            }
        });
};

exports.createProfessor = (req, res, next) => {
    ProfessorRepository.createProfessor(req.body)
        .then(newObj => {
            res.status(201).json(newObj);
        })
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        });
};

exports.updateProfessor = (req, res, next) => {
    ProfessorRepository.updateProfessor(req.body)
        .then(result => {
            res.status(200).json({message: 'Professor updated successfully!', prof: result});
        })
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        });
};

exports.deleteProfessor = (req, res, next) => {
    const profId = req.params.profId;
    ProfessorRepository.deleteProfessor(profId)
        .then(result => {
            res.status(200).json({message: 'Professor deleted successfully!', prof: result});
        })
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        });
};