'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ProjectCommodities extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  ProjectCommodities.init({
    ProjectID: DataTypes.INTEGER,
    CommodityID: DataTypes.INTEGER,
    IsPrimary: DataTypes.BOOLEAN,
    IsSecondary: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'ProjectCommodities',
  });
  return ProjectCommodities;
};