const Professor = require("../../config/sequelize/Professor");
const Department = require("../../config/sequelize/Department");
const Lecture = require("../../config/sequelize/Lecture");

exports.getDepartments = () => {
    return Department.findAll();
}

exports.getDepartmentsById = (deptID) => {
    return Department.findByPk(deptID,
        {
            include: [{
                model: Lecture,
                as: 'lectures',
                include: [{
                    model: Professor,
                    as: 'professor',
                }]
            }]
        });
};

exports.createDepartment = (newDeptData) => {
    return Department.create({
        name: newDeptData.name,
        totalHours: newDeptData.totalHours,
        description: newDeptData.description,
    });
};

exports.updateDepartment = (deptId, deptData) => {
    const name = deptData.name;
    const totalHours = deptData.totalHours;
    const description = deptData.description;
    return Department.update(deptData, {
        where: {_id: deptId}
    });
};

exports.deleteDepartment = (deptId) => {
    return Department.destroy({
        where: {_id: deptId}
    });
};