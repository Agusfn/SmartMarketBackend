require('dotenv').config();
import sequelize from "./database/sequelize"
import { BrokerAccountType } from "./models";
import { BrokerAccountManagerFactory } from "./services/account-managers/BrokerAccountManagerFactory";

(async () => {

    // try {
    //     await sequelize.authenticate();
    //     console.log('Connection has been established successfully.');
    //   } catch (error) {
    //     console.error('Unable to connect to the database:', error);
    // }

    const accManager = BrokerAccountManagerFactory.getManager(BrokerAccountType.ALPACA_PAPER);
    await accManager.buy("", 0);    

})();



// timer each fixed number of time
    // for each portfolio that has to run its decision engine again according to their engine run rules:
        // load with decision manager
        // print suggestions
        // excecute suggestions

// timer each fixed time
    // for each portfolio
        // recalculate and save peformaces