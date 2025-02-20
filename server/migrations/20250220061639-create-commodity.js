'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Commodities', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      CommodityID: {
        type: Sequelize.INTEGER
      },
      CommodityName: {
        type: Sequelize.STRING
      },
      Element: {
        type: Sequelize.STRING
      },
      Notes: {
        type: Sequelize.TEXT
      },
      UnitsOfMeasure: {
        type: Sequelize.STRING
      },
      CreatedBy: {
        type: Sequelize.STRING
      },
      ApprovalStatus: {
        type: Sequelize.STRING
      },
      ApprovalBy: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Commodities');
  }
};