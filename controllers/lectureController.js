const LectureRepository = require('../repository/sequelize/LectureRepository');
const ProfessorRepository = require("../repository/sequelize/ProfessorRepository");
const DepartmentRepository = require("../repository/sequelize/DepartmentRespository");

exports.showLectureList = (req, res, next) => {
    LectureRepository.getLectures()
        .then(lects => {
            res.render('pages/lecture/list', {
                lects: lects,
                navLocation: 'lect'
            });
        });
}

exports.showAddLectureForm = (req, res, next) => {
    let allProfs, allDepts;
    ProfessorRepository.getProfessors()
        .then(profs => {
            allProfs = profs;
            return DepartmentRepository.getDepartments();
        })
        .then(depts => {
            allDepts = depts;
            res.render('pages/lecture/form', {
                lect: {},
                formMode: 'createNew',
                allProfs,
                allDepts,
                pageTitle: 'Nowy wykład',
                btnLabel: 'Dodaj',
                formAction: '/lectures/add',
                navLocation: 'lecture',
                validationErrors: []
            });
        });
}

exports.showLectureDetails = (req, res, next) => {
    const lectId = req.params.lectId;
    let allProfs, allDepts, allLects;

    LectureRepository.getLectures()
        .then(lects => {
            allLects = lects;
            return ProfessorRepository.getProfessors();
        })
        .then(profs => {
            allProfs = profs;
            return DepartmentRepository.getDepartments();
        })
        .then(depts => {
            allDepts = depts;
            return LectureRepository.getLecturesById(lectId);
        }).then(lect => {
        res.render('pages/lecture/form', {
            lect: lect,
            formMode: 'showDetails',
            pageTitle: 'Szczegóły wykładu',
            formAction: '/lecture/details',
            navLocation: 'lect',
            allProfs,
            allDepts,
            allLects,
            validationErrors: []
        });
    });
}

exports.showLectureEdit = (req, res, next) => {
    const lectId = req.params.lectId;
    let allProfs, allDepts, allLects;

    LectureRepository.getLectures()
        .then(lects => {
            allLects = lects;
            return ProfessorRepository.getProfessors();
        })
        .then(profs => {
            allProfs = profs;
            return DepartmentRepository.getDepartments();
        })
        .then(depts => {
            allDepts = depts;
            return LectureRepository.getLecturesById(lectId);
        }).then(lect => {
        res.render('pages/lecture/form', {
            lect: lect,
            formMode: 'edit',
            pageTitle: 'Edycja wykładu',
            btnLabel: 'Edytuj',
            formAction: '/lectures/edit',
            navLocation: 'lect',
            allProfs,
            allDepts,
            allLects,
            validationErrors: []
        });
    });
}

exports.addLecture = (req, res, next) => {
    const lectData = {...req.body};
    let allProfs, allDepts;
    ProfessorRepository.getProfessors()
        .then(profs => {
            allProfs = profs;
            return DepartmentRepository.getDepartments();
        }).then(depts => {
        allDepts = depts;
        return LectureRepository.createLecture(lectData)
            .then(result => {
                res.redirect('/lectures');
            }).catch(err => {
                err.errors.forEach(e => {
                    if (e.path.includes('name') && e.type === 'unique violation') {
                        e.message = 'Podana nazwa wykładu jest już używana';
                    }
                })
                res.render('pages/lecture/form', {
                    lect: lectData,
                    pageTitle: 'Dodawanie wykładu',
                    formMode: 'createNew',
                    btnLabel: 'Dodaj',
                    formAction: '/lectures/add',
                    navLocation: 'lect',
                    buttonCSS: 'submit',
                    allProfs: allProfs,
                    allDepts: allDepts,
                    validationErrors: err.errors
                });
            });
    });
};

exports.updateLecture = (req, res, next) => {
    const lectId = req.body._id;
    const lectData = {...req.body};
    let allDepts, allProfs;
    ProfessorRepository.getProfessors()
        .then(profs => {
            allProfs = profs;
            return DepartmentRepository.getDepartments();
        }).then(depts => {
        allDepts = depts;
        return LectureRepository.updateLecture(lectId, lectData)
            .then(result => {
                res.redirect('/lectures');
            }).catch(err => {
                err.errors.forEach(e => {
                    if (e.path.includes('name') && e.type === 'unique violation') {
                        e.message = 'Podana nazwa wykładu jest już używana';
                    }
                })
                res.render('pages/lecture/form', {
                    lect: lectData,
                    pageTitle: 'Edycja wykładu',
                    formMode: 'edit',
                    btnLabel: 'Dodaj',
                    formAction: '/lectures/edit',
                    navLocation: 'lect',
                    buttonCSS: 'edit',
                    allProfs: allProfs,
                    allDepts: allDepts,
                    validationErrors: err.errors
                });
            });
    })
};

exports.deleteLecture = (req, res, next) => {
    const lectId = req.params.lectId;
    LectureRepository.deleteLecture(lectId)
        .then(result => {
            res.redirect('/lectures');
        });
};

