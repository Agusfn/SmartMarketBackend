require('dotenv').config();
import sequelize from "./database/sequelize"
import { BrokerAccountType, DecisionEngineData, Portfolio } from "./models";
import { PortfolioDecisionManager } from "./services/PortfolioDecisionManager";
import { BrokerAccountManagerFactory } from "./services/account-managers/BrokerAccountManagerFactory";

(async () => {

    await sequelize.authenticate();
    console.log('Connection has been established successfully.');

    // const accManager = BrokerAccountManagerFactory.getManager(BrokerAccountType.ALPACA_PAPER);
    // await accManager.buy("", 0);    

    const portfolio = await Portfolio.findByPk(3);
    
    const decisionManager = new PortfolioDecisionManager(portfolio!);
    await decisionManager.processDecisions();

})();



// timer each fixed number of time
    // for each portfolio that has to run its decision engine again according to their engine run rules:
        // load with decision manager
        // print suggestions
        // excecute suggestions

// timer each fixed time
    // for each portfolio
        // recalculate and save peformaces