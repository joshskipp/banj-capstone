'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class KeyEvent extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  KeyEvent.init({
    EventID: DataTypes.INTEGER,
    EventDate: DataTypes.STRING,
    EventDetails: DataTypes.TEXT,
    CreatedBy: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'KeyEvent',
  });
  return KeyEvent;
};