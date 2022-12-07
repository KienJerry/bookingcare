'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Schedude extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // định danh các mối quan hệ
    }
  };
  Schedude.init({
    currentNumber: DataTypes.INTEGER,
    maxNumber: DataTypes.INTEGER,
    date: DataTypes.DATE,
    timetype: DataTypes.STRING,
    doctorId: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'Schedude',
  });
  return Schedude;
};