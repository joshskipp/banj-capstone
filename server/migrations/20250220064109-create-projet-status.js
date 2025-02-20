'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('ProjetStatus', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      ProjectID: {
        type: Sequelize.INTEGER
      },
      ProjectStatus: {
        type: Sequelize.STRING
      },
      StatusDetailed: {
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
    await queryInterface.dropTable('ProjetStatuses');
  }
};