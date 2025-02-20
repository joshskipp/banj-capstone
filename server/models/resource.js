'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Resource extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Resource.init({
    CommodityID: DataTypes.INTEGER,
    Grade: DataTypes.STRING,
    Tonnage: DataTypes.STRING,
    UnitsOfMeasure: DataTypes.STRING,
    Details: DataTypes.TEXT,
    EstimateDate: DataTypes.STRING,
    Notes: DataTypes.TEXT,
    CreatedBy: DataTypes.STRING,
    ApprovalStatus: DataTypes.STRING,
    ApprovalBy: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Resource',
  });
  return Resource;
};