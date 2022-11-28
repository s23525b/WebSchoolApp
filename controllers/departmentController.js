const DepartmentRepository = require('../repository/sequelize/DepartmentRespository');

exports.showDepartmentList = (req, res, next) => {
    DepartmentRepository.getDepartments()
        .then(depts => {
            res.render('pages/department/list', {
                depts: depts,
                navLocation: 'dept'
            });
        });
}

exports.showAddDepartmentForm = (req, res, next) => {
    res.render('pages/department/form', {
        dept: {},
        pageTitle: 'Nowy departament',
        formMode: 'createNew',
        btnLabel: 'Dodaj',
        formAction: '/departments/add',
        navLocation: 'dept'
    });
}

exports.showDepartmentDetails = (req, res, next) => {
    const deptId = req.params.deptId;
    DepartmentRepository.getDepartmentsById(deptId)
        .then(dept => {
            res.render('pages/department/form', {
                dept: dept,
                formMode: 'showDetails',
                pageTitle: 'Szczegóły katedry',
                formAction: '',
                navLocation: 'dept'
            });
        });
}

exports.showDepartmentEdit = (req, res, next) => {
    const deptId = req.params.deptId;
    DepartmentRepository.getDepartmentsById(deptId)
        .then(dept => {
            res.render('pages/department/form', {
                dept: dept,
                formMode: 'edit',
                pageTitle: 'Edycja katedry',
                btnLabel: 'Edytuj',
                formAction: '/departments/edit',
                navLocation: 'dept'
            });
        });
}

exports.addDepartment = (req, res, next) => {
    const deptData = {...req.body};
    DepartmentRepository.createDepartment(deptData)
        .then(result => {
            res.redirect('/departments');
        });
};

exports.updateDepartment = (req, res, next) => {
    const deptId = req.body._id;
    const deptData = {...req.body};
    DepartmentRepository.updateDepartment(deptId, deptData)
        .then(result => {
            res.redirect('/departments');
        });

};

exports.deleteDepartment = (req, res, next) => {
    const deptId = req.params.deptId;
    DepartmentRepository.deleteDepartment(deptId)
        .then(result => {
            res.redirect('/departments');
        });
};






