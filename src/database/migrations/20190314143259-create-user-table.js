'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('users', {
      id: Sequelize.INTEGER,
      name: Sequelize.STRING,
      email: Sequelize.STRING,
      password: Sequelize.STRING,
      reset_password_token: Sequelize.STRING,
      reset_password_expires: Sequelize.DATE,
      created_at: Sequelize.DATE,
      updated_at: Sequelize.DATE,
      deleted_at: Sequelize.DATE
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('users');
  }
};
