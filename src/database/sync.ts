require('dotenv').config();
import { Account, Asset, AssetPosition, DecisionEngineData, Portfolio, PortfolioMovement } from "../models";


(async () => {
    console.log("Synchronizing database...");

    await Asset.sync({ alter: true });
    await DecisionEngineData.sync({ alter: true });
    await Account.sync({ alter: true });
    await Portfolio.sync({ alter: true });
    await AssetPosition.sync({ alter: true });
    await PortfolioMovement.sync({ alter: true });

    console.log("Synchronize completed");
    process.exit();
})()