'use strict';
const { encryptPassword } = require("../controller/api/v1/auth")

module.exports = {
    async up(queryInterface, Sequelize) {
        const encryptedPassword = await encryptPassword('superadmin')
        await queryInterface.bulkInsert('Users', [{
            name: "aya",
            email: "iniaya@gmail.com",
            encryptedPassword: encryptedPassword,
            userRoleId: 1,
            createdAt: new Date(),
            updatedAt: new Date()
        }, ])
    },

    async down(queryInterface, Sequelize) {
        return queryInterface.bulkDelete('Users', null, {})
    }
};