'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class CompanyProjects extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  CompanyProjects.init({
    ProjectID: DataTypes.INTEGER,
    CompanyID: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'CompanyProjects',
  });
  return CompanyProjects;
};