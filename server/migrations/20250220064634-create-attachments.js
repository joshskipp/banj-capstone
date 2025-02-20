'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Attachments', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      AttachmentID: {
        type: Sequelize.INTEGER
      },
      AttachmentName: {
        type: Sequelize.STRING
      },
      LinkURL: {
        type: Sequelize.STRING
      },
      FileName: {
        type: Sequelize.STRING
      },
      Notes: {
        type: Sequelize.TEXT
      },
      CreatedBy: {
        type: Sequelize.STRING
      },
      ApprovalBy: {
        type: Sequelize.STRING
      },
      ApprovalStatus: {
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
    await queryInterface.dropTable('Attachments');
  }
};