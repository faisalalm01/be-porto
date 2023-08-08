const authRoutes = require('express').Router();
const userControllers = require('../controllers/userControllers');
const checkLogin = require('../helpers/authMiddleware')

authRoutes.get('/search', userControllers.searchUser);
authRoutes.get('/:id', userControllers.getAllDataUserById);
authRoutes.put('/', checkLogin.checkLogin, userControllers.editDataUser);
authRoutes.get('/', userControllers.getAllUser);

module.exports = authRoutes;