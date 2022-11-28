const express = require('express');
const router = express.Router();
const departmentController = require('../controllers/departmentController');

router.get('/', departmentController.showDepartmentList);
router.get('/add', departmentController.showAddDepartmentForm);
router.get('/details/:deptId', departmentController.showDepartmentDetails);
router.get('/edit/:deptId', departmentController.showDepartmentEdit);

router.get('/', function (req, res, next) {
    res.render('index', {navLocation: "dept"});
});

router.post('/add', departmentController.addDepartment);
router.post('/edit', departmentController.updateDepartment);

router.get('/delete/:deptId', departmentController.deleteDepartment);

module.exports = router;