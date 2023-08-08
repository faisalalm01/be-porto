const sosmedRoutes = require('express').Router();
const sosmedControllers = require('../controllers/sosmedControllers');
const checkLogin = require('../helpers/authMiddleware')

sosmedRoutes.post('/', checkLogin.checkLogin, sosmedControllers.postDataUserSosmed)
sosmedRoutes.get('/', sosmedControllers.getSosmed)


module.exports = sosmedRoutes