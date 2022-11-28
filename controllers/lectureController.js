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
                navLocation: 'lecture'
            });
        });
}

exports.showLectureDetails = (req, res, next) => {
    const lectId = req.params.lectId;
    LectureRepository.getLecturesById(lectId)
        .then(lect => {
            res.render('pages/lecture/form', {
                lect: lect,
                formMode: 'showDetails',
                pageTitle: 'Szczegóły wykładu',
                formAction: '',
                navLocation: 'lect'
            });
        });
}

exports.showLectureEdit = (req, res, next) => {
    const lectId = req.params.lectId;
    LectureRepository.getLecturesById(lectId)
        .then(lect => {
            res.render('pages/lecture/form', {
                lect: lect,
                formMode: 'edit',
                pageTitle: 'Edycja wykładu',
                btnLabel: 'Edytuj',
                formAction: '/lecture/edit',
                navLocation: 'lect'
            });
        });
}

exports.addLecture = (req, res, next) => {
    const lectData = {...req.body};
    LectureRepository.createLecture(lectData)
        .then(result => {
            res.redirect('/lectures');
        });
}
exports.updateLecture = (req, res, next) => {
    const lectId = req.body._id;
    const lectData = {...req.body};
    LectureRepository.updateLecture(lectId, lectData)
        .then(result => {
            res.redirect('/lectures');
        });

};
exports.deleteLecture = (req, res, next) => {
    const lectId = req.params.lectId;
    LectureRepository.deleteLecture(lectId)
        .then(result => {
            res.redirect('/lectures');
        });
};

