'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class sosmed extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // this.hasMany(models.usersosmed, {
      //   foreignKey: 'id',
      //   as: 'sosmeds'
      // })
      // define association here
      sosmed.belongsToMany(models.user, {through: 'usersosmed'})
      this.hasMany(models.usersosmed, {
        foreignKey: 'id',
        as: 'sosmed'
      })
    }
  }
  sosmed.init({
    nama: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'sosmed',
  });
  return sosmed;
};