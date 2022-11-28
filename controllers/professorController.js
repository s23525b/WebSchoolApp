const ProfessorRepository = require('../repository/sequelize/ProfessorRepository');

exports.showProfessorList = (req, res, next) => {
    ProfessorRepository.getProfessors()
        .then(profs => {
            res.render('pages/professor/list', {
                profs: profs,
                navLocation: 'prof'
            });
        });
}

exports.showAddProfessorForm = (req, res, next) => {
    res.render('pages/professor/form', {
        prof: {},
        pageTitle: 'Nowy profesor',
        formMode: 'createNew',
        btnLabel: 'Dodaj',
        formAction: '/professors/add',
        navLocation: 'prof'
    });
}

exports.showProfessorDetails = (req, res, next) => {
    const profId = req.params.profId;
    ProfessorRepository.getProfessorsById(profId)
        .then(prof => {
            res.render('pages/professor/form', {
                prof: prof,
                formMode: 'showDetails',
                pageTitle: 'Szczegóły profesora',
                formAction: '',
                navLocation: 'prof'
            });
        });
}

exports.showProfessorEdit = (req, res, next) => {
    const profId = req.params.profId;
    ProfessorRepository.getProfessorsById(profId)
        .then(prof => {
            res.render('pages/professor/form', {
                prof: prof,
                formMode: 'edit',
                pageTitle: 'Edycja profesora',
                btnLabel: 'Edytuj',
                formAction: '/professors/edit',
                navLocation: 'prof'
            });
        });
}

exports.addProfessor = (req, res, next) => {
    const profData = {...req.body};
    ProfessorRepository.createProfessor(profData)
        .then(result => {
            res.redirect('/professors');
        });
};

exports.updateProfessor = (req, res, next) => {
    const profId = req.body._id;
    const profData = {...req.body};
    ProfessorRepository.updateProfessor(profId, profData)
        .then(result => {
            res.redirect('/professors');
        });

};

exports.deleteProfessor = (req, res, next) => {
    const profId = req.params.profId;
    ProfessorRepository.deleteProfessor(profId)
        .then(result => {
            res.redirect('/professors');
        });
};



