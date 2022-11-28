const express = require('express');
const router = express.Router();

const lectApiController = require('../../api/LectureAPI');

router.get('/', lectApiController.getLectures);
router.get('/:lectId', lectApiController.getLecturesById);
router.post('/', lectApiController.createLecture);
router.put('/:lectId', lectApiController.updateLecture);
router.delete('/:lectId', lectApiController.deleteLecture);

module.exports = router;