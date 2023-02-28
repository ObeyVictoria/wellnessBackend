const Sequelize = require("sequelize")
const sequelize = require("../config/connection.js")

const Users = sequelize.define("user",{
    loginId:{
        type:Sequelize.UUID,
        defaultValue:Sequelize.UUIDV4,
        allowNull:false,
        primaryKey:true
    },
    email:{
        type:Sequelize.STRING,
        allowNull:false,
    },
    password:{
        type:Sequelize.TEXT,
        allowNull:false
    },
    userType:{
        type:Sequelize.STRING,
        allowNull:false   
    },
    firstName:{
        type:Sequelize.STRING,
        allowNull:false   
    }
})
module.exports = {Users}