'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Reserves extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Reserves.init({
    ProjectID: DataTypes.INTEGER,
    CommodityID: DataTypes.INTEGER,
    Tonnage: DataTypes.DOUBLE,
    UnitsOfMeasure: DataTypes.STRING,
    Grade: DataTypes.STRING,
    EstimateDate: DataTypes.STRING,
    Notes: DataTypes.TEXT,
    CreatedBy: DataTypes.STRING,
    ApprovalStatus: DataTypes.STRING,
    ApprovalBy: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Reserves',
  });
  return Reserves;
};