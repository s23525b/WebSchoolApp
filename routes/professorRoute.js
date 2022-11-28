const express = require('express');
const router = express.Router();
const professorController = require('../controllers/professorController');

router.get('/', professorController.showProfessorList);
router.get('/add', professorController.showAddProfessorForm);
router.get('/details/:profId', professorController.showProfessorDetails);
router.get('/edit/:profId', professorController.showProfessorEdit);

router.get('/', function (req, res, next) {
    res.render('index', {navLocation: "prof"});
});

router.post('/add', professorController.addProfessor);
router.post('/edit', professorController.updateProfessor);

router.get('/delete/:profId', professorController.deleteProfessor);

module.exports = router;