'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Reserves', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      ProjectID: {
        type: Sequelize.INTEGER
      },
      CommodityID: {
        type: Sequelize.INTEGER
      },
      Tonnage: {
        type: Sequelize.DOUBLE
      },
      UnitsOfMeasure: {
        type: Sequelize.STRING
      },
      Grade: {
        type: Sequelize.STRING
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
    await queryInterface.dropTable('Reserves');
  }
};