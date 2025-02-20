'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Project extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Project.init({
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    ProjectName: DataTypes.STRING,
    Product: DataTypes.STRING,
    Latitude: DataTypes.DECIMAL,
    Longitude: DataTypes.DECIMAL,
    CreatedBy: DataTypes.STRING,
    ApprovalStatus: DataTypes.STRING,
    ApprovalBy: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Project',
  });
  return Project;
};