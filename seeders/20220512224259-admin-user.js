'use strict';
const { encryptPassword } = require("../controller/api/v1/auth")

module.exports = {
    async up(queryInterface, Sequelize) {
        // const encryptedPassword = await encryptPassword('123')
        await queryInterface.bulkInsert('Users', [{
                name: "hidayahtria",
                email: "hidayahtria@gmail.com",
                encryptedPassword: await encryptPassword('123456'),
                userRoleId: 2,
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                name: "nanda",
                email: "nanda@gmail.com",
                encryptedPassword: await encryptPassword('123456'),
                userRoleId: 3,
                createdAt: new Date(),
                updatedAt: new Date()
            },
        ])
    },

    async down(queryInterface, Sequelize) {
        return queryInterface.bulkDelete('Users', null, {})
    }
};