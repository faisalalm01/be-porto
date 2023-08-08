const portoRoutes = require('express').Router();
const portoControllers = require('../controllers/potofolioControllers');
const checkLogin = require('../helpers/authMiddleware')
const uploadMidlleware = require('../helpers/upploadMiddleware');
const uploadCloudinary = require('../helpers/clouinaryMiddleware');

portoRoutes.get('/:id', portoControllers.getDetailPorto);
portoRoutes.post('/', checkLogin.checkLogin, uploadMidlleware, uploadCloudinary, portoControllers.postDataPorto);
portoRoutes.put('/:id', checkLogin.checkLogin, portoControllers.updateDataPorto);
portoRoutes.delete('/:id', checkLogin.checkLogin, portoControllers.deleteDataPorto);
portoRoutes.get('/', portoControllers.getAllDataPorto)

module.exports = portoRoutes;