const LectureRepository = require('../repository/sequelize/LectureRepository');

exports.getLectures = (req, res, next) => {
    LectureRepository.getLectures()
        .then(lects => {
            res.status(200).json(lects);
        })
        .catch(err => {
            console.log(err)
        });
};

exports.getLecturesById = (req, res, next) => {
    const lectId = req.params.lectId;
    LectureRepository.getLecturesById(lectId)
        .then(lects => {
            if (!lects) {
                res.status(404).json({
                    message: 'Lecture with id: ' + lects + ' not found'
                })
            } else {
                res.status(200).json(lects);
            }
        });
};

exports.createLecture = (req, res, next) => {
    LectureRepository.createLecture(req.body)
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

exports.updateLecture = (req, res, next) => {
    LectureRepository.updateLecture(req.body)
        .then(result => {
            res.status(200).json({message: 'Lecture updated successfully!', lect: result});
        })
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        });
};

exports.deleteLecture = (req, res, next) => {
    const lectId = req.params.lectId;
    LectureRepository.deleteLecture(lectId)
        .then(result => {
            res.status(200).json({message: 'Lecture deleted successfully!', lect: result});
        })
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        });
};