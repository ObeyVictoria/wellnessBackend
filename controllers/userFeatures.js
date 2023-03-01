const sequelize = require("../config/connection.js")
const { Client } = require("../models/client.js")
const { Therapist } = require("../models/therapist.js")
const { Users } = require("../models/users.js")
const jwt = require("jsonwebtoken")
const bcrypt = require('bcryptjs')

const saltRounds = bcrypt.genSaltSync(10)
const secret = "feminineWellness"

const therapistList = {
    firstName: null,
    lastName: null,
    gender: null,
    country: null,
    calendLink: null
}
let therapis = []

//CLIENT REGISTRATION
const clRegister = async(req, res) =>{
    const cus = {firstName: req.body.fName,
    lastName: req.body.lName,
    country:req.body.country,
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password, saltRounds)}
    const cusLogin = {
        email: req.body.email,
        firstName: req.body.fName,
        password: bcrypt.hashSync(req.body.password, saltRounds),
        userType: "Client"}
    
       
  Client.findAll({
        where: {
            email: req.body.email
        }
      }).then(rs =>{
        if(rs.length >= 1)
        {
            res.status(200).json([{message:"email used"}])  
        }
        else
        {
            Client.create(cus).then(rs=>{
                Client.findAll({
                    where: {
                        email: req.body.email 
                    }
                }).then(rs=>{
                    Users.create(cusLogin)
                })
                console.log(rs)
                res.status(200).json([{ message: "data created" }])
            }).catch(err=>{
                console.log(err)
                res.status(403).json([{ message: "err" }])
            })
        }
    }).catch(err=>{
          console.log(err)
      });
}

// Therapist Registration
const thpRegister = async(req, res) =>{
    const thp = {firstName: req.body.fName,
    lastName: req.body.lName,
    gender: req.body.gender,
    exp1: req.body.exp1,
    calendLink:req.body.cLink,
    exp2: req.body.exp2,
    expYear: req.body.eYear,
    country: req.body.country,
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password, saltRounds)}
    const thpLogin = {
        email: req.body.email,
        firstName: req.body.fName,
        password: bcrypt.hashSync(req.body.password, saltRounds),
        userType: "Therapist"}
    
       
  Therapist.findAll({
        where: {
            email: req.body.email
        }
      }).then(rs =>{
        if(rs.length >= 1)
        {
            res.status(200).json([{message:"email used"}])  
        }
        else
        {
            Therapist.create(thp).then(rs=>{
                Therapist.findAll({
                    where: {
                        email: req.body.email 
                    }
                }).then(rs=>{
                    Users.create(thpLogin)
                })
                console.log(rs)
                res.status(200).json([{ message: "data created" }])
            }).catch(err=>{
                console.log(err)
                res.status(403).json([{ message: "err" }])
            })
        }
    }).catch(err=>{
          console.log(err)
      });
}
//USERS LOGIN
const login = async(req,res)=>{
    const  email = req.body.email
    const  password = req.body.password
      Users.findOne({
          where: {
              email: email
          }
        }).then(rs =>{
       if(rs)
       {
          const validity  =  bcrypt.compareSync(password,rs.dataValues.password)
          if(validity == true){
              const token = jwt.sign(rs.dataValues,secret)
              res.status(200).json([{ message: token}])
          }else{
              res.status(200).json([{ message: "invalid" }]) 
          }
       }else{
          res.status(200).json([{ message: "invalid" }]) 
       }
  
      }).catch(err=>{
            console.log(err)
        });
    }
    //USERS DASHBOARD
    const dashboard =(req,res)=>{
        email = req.decoded.email
        //res.status(200).json([{ message: req.decoded }])
        Users.findAll({
            where: {
                email: email
            }
        }).then(rsw =>{
            res.status(200).json([{email:email,fname:req.decoded.firstName,user:req.decoded.userType}])

            }).catch(err=>{
                   console.log(err)
        }) 
    }
    //SHOW THERAPIST
    const showTheraph = async(req,res)=>{
        
        Therapist.findAll({
            order: [["expYear", "ASC"]]
        }).then(results => {
            if (typeof results === undefined) {
                console.log(results + 'is null')
            }else {
                results.map(result => {
                    let Therap = Object.create(therapistList)
                    Therap.firstName = result.firstName
                    Therap.lastName = result.lastName
                    Therap.gender = result.gender
                    Therap.country = result.country
                    Therap.calendLink = result.calendLink
                    therapis.push(Therap)
                })
                res.status(200).json([{allTheraph:therapis}])}
            }).catch(error => {
                console.log(error)
        })
    }
    
module.exports = {clRegister,thpRegister,login,dashboard,showTheraph}