console.log('models/index.js'); 
const Sequelize = require("sequelize");

const sequelize = new Sequelize('Employees', 'postgres', 'Niveraju612', {
  host: 'localhost',
  dialect: 'postgres' 
});
  
(async () => {
  try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
      } catch (error) {
        console.error('Unable to connect to the database:', error);
      }
})();
  
const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;
db.employees = require('./employeeModel')(sequelize, Sequelize);

module.exports = db;
  