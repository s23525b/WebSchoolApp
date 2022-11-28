const express = require('express');
const router = express.Router();

const profApiController = require('../../api/DepartmentAPI');

router.get('/', profApiController.getDepartments);
router.get('/:deptId', profApiController.getDeparmtmentsById);
router.post('/', profApiController.createDepartment);
router.put('/:deptId', profApiController.updateDepartment);
router.delete('/:deptId', profApiController.deleteDepartment);

module.exports = router;