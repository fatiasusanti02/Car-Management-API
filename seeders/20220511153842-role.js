'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('UserRoles', [{
      name: 'Superadmin',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      name: 'Admin',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      name: 'Member',
      createdAt: new Date(),
      updatedAt: new Date()
    }])
    },

  async down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('UserRoles', null, {})
  }
};
