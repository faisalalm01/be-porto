'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class portofolio extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      portofolio.belongsTo(models.user, {
        foreignKey: 'userId',
        as: 'users'
      })
    }
  }
  portofolio.init({
    image: DataTypes.STRING,
    title: DataTypes.STRING,
    deskripsi: DataTypes.TEXT,
    linkproject: DataTypes.STRING,
    userId: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'portofolio',
  });
  return portofolio;
};