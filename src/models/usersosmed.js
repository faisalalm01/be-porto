'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class usersosmed extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.sosmed, {
        foreignKey: 'sosmedId',
        as: 'sosmeds'
      })
    }
  }
  usersosmed.init({
    userId: DataTypes.STRING,
    sosmedId: DataTypes.STRING,
    linksosmed: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'usersosmed',
  });
  return usersosmed;
};