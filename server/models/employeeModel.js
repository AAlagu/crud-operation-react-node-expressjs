module.exports = (sequelize, Sequelize) => {
    const Employee = sequelize.define('Employee', {
      Emp_id: { 
        type: Sequelize.INTEGER,
        primaryKey: true,
        allowNull: false
      },
    Emp_name: {
        type: Sequelize.STRING,
        allowNull: false
      },
    Job_name: {
        type: Sequelize.STRING
      },
    Salary: {
        type: Sequelize.INTEGER
      },
    Dep_id: {
        type: Sequelize.INTEGER,
        allowNull: false
      }
    }, {
       // don't add the timestamp attributes (updatedAt, createdAt)
        timestamps: false,
        // disable the modification of tablenames; By default, sequelize will automatically
        // transform all passed model names (first parameter of define) into plural.
        // if you don't want that, set the following
        freezeTableName: true,
        // define the table's name
        //tableName: 'Employee'
      });
  
    return Employee;
  }
  