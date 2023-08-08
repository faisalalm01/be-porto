const authRoutes = require('express').Router();
const authControllers = require('../controllers/authControllers');

authRoutes.post('/register', authControllers.register);
authRoutes.post('/login', authControllers.login);
authRoutes.get('/verify/:token', authControllers.verify)

module.exports = authRoutes;