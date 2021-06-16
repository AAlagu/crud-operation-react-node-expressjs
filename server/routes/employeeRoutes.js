console.log('routes/employee.js');
var express = require('express');
var router = express.Router();
var employees = require("../controllers/employeeController");

// Create a new Employee
router.post('/insert', employees.create);

// Retrieve all Employees
router.get('/getAll', employees.findAll);

// Retrieve a single Employee with empId
router.get('/getbyID:id', employees.findOne);

// Update a Employee with empId
router.post('/updatebyID/:EmpId', employees.update);

// Delete a Employee with empId
router.delete('/deletebyID/:EmpId', employees.delete);

// Delete all Employees
router.delete('/delete', employees.deleteAll);

module.exports = router;

