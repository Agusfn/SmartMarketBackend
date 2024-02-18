import { Portfolio } from "../../models";
import { DecisionEngineI } from "./DecisionEngineFactory";
import { MarketDataServiceI } from "../market-data-services/MarketDataServiceI";

export class RandomDecisionEngine implements DecisionEngineI {

    
    public async processSuggestions(portfolio: Portfolio, marketDataService: MarketDataServiceI) {

        console.log("Portfolio: ", JSON.stringify(portfolio, null, 4));
        
        const movements = await portfolio.getMovements();
        console.log("movements: ", JSON.stringify(movements, null, 4));

        //console.log("marketDataService", marketDataService);

        return [];
    }

    
}