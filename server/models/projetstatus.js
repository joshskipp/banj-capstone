'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ProjetStatus extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  ProjetStatus.init({
    ProjectID: DataTypes.INTEGER,
    ProjectStatus: DataTypes.STRING,
    StatusDetailed: DataTypes.TEXT,
    CreatedBy: DataTypes.STRING,
    ApprovalStatus: DataTypes.STRING,
    ApprovalBy: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'ProjetStatus',
  });
  return ProjetStatus;
};