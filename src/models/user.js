'use strict';
const {
  Model
} = require('sequelize');
const sosmed = require('./sosmed');
module.exports = (sequelize, DataTypes) => {
  class user extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      user.belongsToMany(models.sosmed, {through: 'usersosmed'})
      user.hasMany(models.portofolio, {
        foreignKey: 'userId',
        as: 'portofolio'
      })
    }
  }
  user.init({
    username: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    address: DataTypes.STRING,
    nohp: DataTypes.STRING,
    verify: DataTypes.BOOLEAN,
    verifyToken: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'user',
  });
  return user;
};