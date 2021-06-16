const db = require("../models");
const Employee = db.employees;

// Create and Save a new Employee
exports.create = (req, res) => {
  // Validate request
  if (!req.body.item.empId) {
    res.status(400).send('Employee Id cannot be empty!');
    return;
  }

  // Create a Employee
  const employee = {
    Emp_id: req.body.item.empId,
    Emp_name: req.body.item.empName,
    Job_name: req.body.item.job,
    Salary: req.body.item.salary,
    Dep_id: req.body.item.dept
  };

  // Save Employee in the database
  Employee.create(employee)
    .then(data => {
      res.send('Record Inserted Successfully.');
    })
    .catch((error) => {
      if(error.name === 'SequelizeUniqueConstraintError'){
        res.status(500).send('Employee ID already exists.');
      }
    });
};

// Retrieve all Employees from the database.
exports.findAll = (req, res) => {
  console.log('finall function');
  Employee.findAll()
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving employees."
      });
    });
};

// Find a single Employee with an id
exports.findOne = (req, res) => {
  // Validate request
  if (!req.params.EmpId) {
    res.status(400).send({
      message: "Employee Id cannot be empty!"
    });
    return;
  }
  const EmpId = req.params.EmpId;

  Employee.findByPk(EmpId)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving Employee with id=" + EmpId
      });
    });
};

// Update a Employee by the id in the request
exports.update = (req, res) => {
  // Validate request
  if (!req.params.EmpId) {
    res.status(400).send({
      message: "Employee Id cannot be empty!"
    });
    return;
  }

  const EmpId = req.params.EmpId;
  Employee.update(
    {Job_name: req.body.item.job, Salary: req.body.item.salary, Dep_id: req.body.item.dept}, 
    {where: { Emp_id: EmpId }}
    )
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Employee was updated successfully."
        });
      } else {
        res.send({
          message: `Cannot update Employee with id=${EmpId}. Given EmpId was not found!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating Employee with id=" + EmpId
      });
    });
};

// Delete a Employee with the specified id in the request
exports.delete = (req, res) => {
  // Validate request
  if (!req.params.EmpId) {
    res.status(400).send({
      message: "Employee Id cannot be empty!"
    });
    return;
  }
  const EmpId = req.params.EmpId;

  Employee.destroy({
    where: { Emp_id: EmpId  }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Employee was deleted successfully!"
        });
      } else {
        res.send({
          message: `Cannot delete Employee with id=${EmpId}. Given EmpId was not found!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete Employee with id=" + EmpId
      });
    });
};

// Delete all Employees from the database.
exports.deleteAll = (req, res) => {
  Employee.destroy({
    where: {},
    truncate: false
  })
    .then(nums => {
      res.send({ message: `${nums} Employees were deleted successfully!` });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all employees."
      });
    });
};

