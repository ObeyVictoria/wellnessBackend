const express = require("express")
const {routeManager} = require('./routes/rts.js')
const bcrypt = require('bcryptjs')
//const dotenv = require('dotenv')
const bodyParser = require('body-parser')
const saltRounds = bcrypt.genSaltSync(10)
const app = express()
const cors = require('cors')
//dotenv.config()
app.use(cors())

//console.log(process.env.DATABASE)
console.log(bcrypt.hashSync("password", saltRounds))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:false}))
app.use('/',routeManager)
const port = 4000

app.listen(port, () => {
    console.log(`example app listening on port ${port}`)
})