'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Users', [{
      email: 'admin@gmail.com',
      password: 'Convinh_1230',
      firstName: 'KienJerry',
      lastName: 'Dev',
      address: 'VIETNAMES',
      gender: 1,
      roleId:'R1',
      phonenumber: '0352626013',
      positionID:'',
      createdAt: new Date(),
      updatedAt: new Date(),
    }])
    // await queryInterface.bulkInsert('People', [{
    //   name: 'John Doe',
    //   isBetaMember: false
    // }], {});

  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
