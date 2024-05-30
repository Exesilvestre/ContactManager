'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Contacts', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      IdContact: {
        type: Sequelize.UUID
      },
      Name: {
        type: Sequelize.TEXT
      },
      Email: {
        type: Sequelize.TEXT
      },
      Title: {
        type: Sequelize.TEXT
      },
      Address: {
        type: Sequelize.TEXT
      },
      Cellphone: {
        type: Sequelize.INTEGER
      },
      ProfilePic: {
        type: Sequelize.TEXT
      },
      UserId: {
        type: Sequelize.UUID
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
    await queryInterface.dropTable('Contacts');
  }
};