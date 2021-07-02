'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('Restaurants', 'FavoraitedCount', {
      type: Sequelize.INTEGER,
      unsigned: true
    })
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('Restaurants', 'FavoraitedCount')
  }
};
