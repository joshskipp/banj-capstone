'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Resources', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      CommodityID: {
        type: Sequelize.INTEGER
      },
      Grade: {
        type: Sequelize.STRING
      },
      Tonnage: {
        type: Sequelize.STRING
      },
      UnitsOfMeasure: {
        type: Sequelize.STRING
      },
      Details: {
        type: Sequelize.TEXT
      },
      EstimateDate: {
        type: Sequelize.STRING
      },
      Notes: {
        type: Sequelize.TEXT
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
    await queryInterface.dropTable('Resources');
  }
};