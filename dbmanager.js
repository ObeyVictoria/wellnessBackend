const sequelize = require("./config/connection");
const { client } = require("./models/client");
const { user } = require("./models/users");
const { therapist } = require("./models/therapist");

sequelize.sync({force:true}).then(rs=>{
    console.log(rs)
}).catch(err=>{
    console.log(err)
})