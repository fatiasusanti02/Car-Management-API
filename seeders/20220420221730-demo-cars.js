'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('Cars', [{
      nama: "Tesla Model Y",
      sewa: 700000,
      ukuran: "Small",
      image: "sportagejpg.jpg",
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      nama: "Hyundai Ioniq 5",
      sewa: 500000,
      ukuran: "Small",
      image: "60f592b49421e.jpg",
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      nama: "Toyota Fortuner",
      sewa: 400000,
      ukuran: "Large",
      image: "fortuner.jpg",
      createdAt: new Date(),
      updatedAt: new Date()
    }
    ]);
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('Cars', null, {})
  }
};
