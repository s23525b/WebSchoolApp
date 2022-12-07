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
        navLocation: 'prof',
        buttonCSS: 'submit',
        validationErrors: []
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
                navLocation: 'prof',
                buttonCSS: 'edit',
                validationErrors: []
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
                navLocation: 'prof',
                buttonCSS: 'edit',
                validationErrors: []
            });
        });
}

exports.addProfessor = (req, res, next) => {
    const profData = {...req.body};
    ProfessorRepository.createProfessor(profData)
        .then(result => {
            res.redirect('/professors');
        }).catch(err => {
        err.errors.forEach(e => {
            if (e.path.includes('email') && e.type === 'unique violation') {
                e.message = 'Podany adres email jest już używany';
            }
        })
        res.render('pages/professor/form', {
            prof: profData,
            pageTitle: 'Dodawanie profesora',
            formMode: 'createNew',
            btnLabel: 'Dodaj',
            formAction: '/professors/add',
            navLocation: 'prof',
            buttonCSS: 'submit',
            validationErrors: err.errors
        });
    });
};

exports.updateProfessor = (req, res, next) => {
    const profId = req.body._id;
    const profData = {...req.body};
    ProfessorRepository.updateProfessor(profId, profData)
        .then(result => {
            res.redirect('/professors');
        }).catch(err => {
        err.errors.forEach(e => {
            if (e.path.includes('email') && e.type === 'unique violation') {
                e.message = 'Podany adres email jest już używany';
            }
        })
        res.render('pages/professor/form', {
            prof: profData,
            formMode: 'edit',
            pageTitle: 'Edycja profesora',
            btnLabel: 'Edytuj',
            formAction: '/professors/edit',
            navLocation: 'prof',
            buttonCSS: 'edit',
            validationErrors: err.errors
        });
    });
};

exports.deleteProfessor = (req, res, next) => {
    const profId = req.params.profId;
    ProfessorRepository.deleteProfessor(profId)
        .then(result => {
            res.redirect('/professors');
        });
};



