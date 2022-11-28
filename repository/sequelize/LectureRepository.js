const Sequelize = require('sequelize');

const Professor = require("../../config/sequelize/Professor");
const Department = require("../../config/sequelize/Department");
const Lecture = require("../../config/sequelize/Lecture");

exports.getLectures = () => {
    return Lecture.findAll({
        include: [
            {
                model: Professor,
                as: 'professor'
            },
            {
                model: Department,
                as: 'department'
            }]
    });
};

exports.getLecturesById = (lectureId) => {
    return Lecture.findByPk(lectureId, {
        include: [
            {
                model: Professor,
                as: 'professor'
            },
            {
                model: Department,
                as: 'department'
            }]
    });
};

exports.createLecture = (data) => {
    console.log(JSON.stringify(data));

    return Lecture.create({
        prof_id: data.prof_id,
        dept_id: data.dept_id,
        name: data.name,
        dateFrom: data.dateFrom,
        dateTo: data.dateTo,
        duration: data.duration
    });
};

exports.updateLecture = (lectureId, data) => {
    const name = data.name;
    const dateFrom = data.dateFrom;
    const dateTo = data.dateTo;
    const duration = data.duration;
    return Lecture.update(data, {
        where: {_id: lectureId}
    });
}

exports.deleteLecture = (lectureId) => {
    return Lecture.destroy({
        where: {_id: lectureId}
    });
};

exports.deleteManyLectures = (lectureIds) => {
    return Lecture.find({_id: {[Sequelize.Op.in]: lectureIds}})
}