const Sequelize = require('sequelize')
//const dotenv = require('dotenv')
//dotenv.config()
const sequelize = new Sequelize("sql12601649","sql12601649","GJQvBJThFI"
    ,{
    dialect:"mysql", host:"sql12.freesqldatabase.com"
});

  
  
module.exports = sequelize;