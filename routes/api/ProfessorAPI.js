const express = require('express');
const router = express.Router();

const profApiController = require('../../api/ProfessorAPI');

router.get('/', profApiController.getProfessors);
router.get('/:profId', profApiController.getProfessorById);
router.post('/', profApiController.createProfessor);
router.put('/:profId', profApiController.updateProfessor);
router.delete('/:profId', profApiController.deleteProfessor);

module.exports = router;