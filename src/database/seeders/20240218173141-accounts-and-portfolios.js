'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */

    await queryInterface.bulkInsert('broker_account', [
      { id: 1, account_type: "alpaca_paper" },
      { id: 2, account_type: "alpaca_live" }
    ]);

    await queryInterface.bulkInsert('decision_engine_data', [
      { code: "random_engine", name: "Aleatorio", description: "Motor de decision aleatorio", run_each_hours: 1 }
    ]);

    await queryInterface.bulkInsert('portfolio', [

      // Alpaca Paper Test Portfolios (10x of $10.000)
      { id: 1, decision_engine_code: "random_engine", name: "Portfolio 1", available_balance: 10000, net_worth: 10000, last_net_worth_update: new Date(), broker_account_id: 1 },
      { id: 2, decision_engine_code: null, name: "Portfolio 2", available_balance: 10000, net_worth: 10000, last_net_worth_update: new Date(), broker_account_id: 1 },
      { id: 3, decision_engine_code: null, name: "Portfolio 3", available_balance: 10000, net_worth: 10000, last_net_worth_update: new Date(), broker_account_id: 1 },
      { id: 4, decision_engine_code: null, name: "Portfolio 4", available_balance: 10000, net_worth: 10000, last_net_worth_update: new Date(), broker_account_id: 1 },
      { id: 5, decision_engine_code: null, name: "Portfolio 5", available_balance: 10000, net_worth: 10000, last_net_worth_update: new Date(), broker_account_id: 1 },
      { id: 6, decision_engine_code: null, name: "Portfolio 6", available_balance: 10000, net_worth: 10000, last_net_worth_update: new Date(), broker_account_id: 1 },
      { id: 7, decision_engine_code: null, name: "Portfolio 7", available_balance: 10000, net_worth: 10000, last_net_worth_update: new Date(), broker_account_id: 1 },
      { id: 8, decision_engine_code: null, name: "Portfolio 8", available_balance: 10000, net_worth: 10000, last_net_worth_update: new Date(), broker_account_id: 1 },
      { id: 9, decision_engine_code: null, name: "Portfolio 9", available_balance: 10000, net_worth: 10000, last_net_worth_update: new Date(), broker_account_id: 1 },
      { id: 10, decision_engine_code: null, name: "Portfolio 10", available_balance: 10000, net_worth: 10000, last_net_worth_update: new Date(), broker_account_id: 1 }

    ]);

    // Initial movement of 10.000 for each portfolio
    await queryInterface.bulkInsert('portfolio_movement', [
      { portfolio_id: 1, movement_type: "deposit", date: new Date(), movement_amount: 10000, asset_id: null },
      { portfolio_id: 2, movement_type: "deposit", date: new Date(), movement_amount: 10000, asset_id: null },
      { portfolio_id: 3, movement_type: "deposit", date: new Date(), movement_amount: 10000, asset_id: null },
      { portfolio_id: 4, movement_type: "deposit", date: new Date(), movement_amount: 10000, asset_id: null },
      { portfolio_id: 5, movement_type: "deposit", date: new Date(), movement_amount: 10000, asset_id: null },
      { portfolio_id: 6, movement_type: "deposit", date: new Date(), movement_amount: 10000, asset_id: null },
      { portfolio_id: 7, movement_type: "deposit", date: new Date(), movement_amount: 10000, asset_id: null },
      { portfolio_id: 8, movement_type: "deposit", date: new Date(), movement_amount: 10000, asset_id: null },
      { portfolio_id: 9, movement_type: "deposit", date: new Date(), movement_amount: 10000, asset_id: null },
      { portfolio_id: 10, movement_type: "deposit", date: new Date(), movement_amount: 10000, asset_id: null }
    ]);



  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
