const mainRoutes = require('express').Router();
const authRoutes = require('./authRoutes');
const userRoutes = require('./userRoutes');
const portoRoutes = require('./portoRoutes');
const sosmedRoutes = require('./sosmedRoutes');

mainRoutes.use('/auth', authRoutes);
mainRoutes.use('/user', userRoutes);
mainRoutes.use('/porto', portoRoutes);
mainRoutes.use('/sosmed', sosmedRoutes);

module.exports = mainRoutes;