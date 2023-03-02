const express = require("express")
const { clRegister,thpRegister,login, dashboard,showTheraph, profile } = require('../controllers/userFeatures.js')
const { verifyAuth } = require('../middleware/auth.js');
const routeManager = express.Router()

routeManager.post("/registerClient",clRegister)
routeManager.post("/registerTheraph",thpRegister)
routeManager.post('/Auth',login)
routeManager.post('/dashboard',verifyAuth,dashboard)
routeManager.get('/allTheraph',verifyAuth,showTheraph)
routeManager.post('/profile',verifyAuth,profile)

module.exports = {routeManager}