const DepartmentRepository = require('../repository/sequelize/DepartmentRespository');

exports.getDepartments = (req, res, next) => {
    DepartmentRepository.getDepartments()
        .then(depts => {
            res.status(200).json(depts);
        })
        .catch(err => {
            console.log(err)
        });
};

exports.getDeparmtmentsById = (req, res, next) => {
    const deptId = req.params.deptId;
    DepartmentRepository.getDepartmentsById(deptId)
        .then(depts => {
            if (!depts) {
                res.status(404).json({
                    message: 'Department with id: ' + deptId + ' not found'
                })
            } else {
                res.status(200).json(depts);
            }
        });
};

exports.createDepartment = (req, res, next) => {
    DepartmentRepository.createDepartment(req.body)
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

exports.updateDepartment = (req, res, next) => {
    DepartmentRepository.updateDepartment(req.body)
        .then(result => {
            res.status(200).json({message: 'Department updated successfully!', dept: result});
        })
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        });
};

exports.deleteDepartment = (req, res, next) => {
    const deptId = req.params.deptId;
    DepartmentRepository.deleteDepartment(deptId)
        .then(result => {
            res.status(200).json({message: 'Department deleted successfully!', dept: result});
        })
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        });
};