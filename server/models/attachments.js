'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Attachments extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Attachments.init({
    AttachmentID: DataTypes.INTEGER,
    AttachmentName: DataTypes.STRING,
    LinkURL: DataTypes.STRING,
    FileName: DataTypes.STRING,
    Notes: DataTypes.TEXT,
    CreatedBy: DataTypes.STRING,
    ApprovalBy: DataTypes.STRING,
    ApprovalStatus: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Attachments',
  });
  return Attachments;
};