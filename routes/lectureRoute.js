const express = require('express');
const router = express.Router();
const lectureController = require('../controllers/lectureController');

router.get('/', lectureController.showLectureList);
router.get('/add', lectureController.showAddLectureForm);
router.get('/details/:lectId', lectureController.showLectureDetails);
router.get('/edit/:lectId', lectureController.showLectureEdit);

router.get('/', function (req, res, next) {
    res.render('index', {navLocation: "lect"});
});

router.post('/add', lectureController.addLecture);
router.post('/edit', lectureController.updateLecture);

router.get('/delete/:lectId', lectureController.deleteLecture);

module.exports = router;