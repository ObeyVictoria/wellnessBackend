const Sequelize = require("sequelize")
const sequelize = require("../config/connection.js")

const Therapist = sequelize.define("therapist",{
    therapistId:{
        type:Sequelize.UUID,
        defaultValue:Sequelize.UUIDV4,
        allowNull:false,
        primaryKey:true
    },
    firstName:{
        type:Sequelize.STRING,
        allowNull:false
    },
    lastName:{
        type:Sequelize.STRING,
        allowNull:false
    }, 
    gender:{
        type:Sequelize.STRING,
        allowNull:false
    }, 
    calendLink:{
        type:Sequelize.STRING,
        allowNull:false
    },
    exp1:{
        type:Sequelize.STRING,
        allowNull:false
    },
    exp2:{
        type:Sequelize.STRING,
        allowNull:true
    },
    country:{
        type:Sequelize.STRING,
        allowNull:true
    },
    email:{
        type:Sequelize.STRING,
        allowNull:false,
        unique:true
    },
    password:{
        type:Sequelize.TEXT,
        allowNull:false
    },
    expYear:{
        type:Sequelize.INTEGER,
        allowNull:false
    },

})

module.exports = {Therapist}