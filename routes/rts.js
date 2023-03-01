const express = require("express")
const { clRegister,thpRegister,login, dashboard,showTheraph } = require('../controllers/userFeatures.js')
const { verifyAuth } = require('../middleware/auth.js');
const routeManager = express.Router()

routeManager.post("/registerClient",clRegister)
routeManager.post("/registerTheraph",thpRegister)
routeManager.post('/Auth',login)
routeManager.post('/dashboard',verifyAuth,dashboard)
//routeManager.post('/allTheraph',verifyAuth,showTheraph)

module.exports = {routeManager}