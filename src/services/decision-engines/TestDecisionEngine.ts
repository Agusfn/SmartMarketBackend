import { Portfolio } from "../../models";
import { DecisionEngineI } from "./DecisionEngineFactory";
import { MarketDataServiceI } from "../market-data-services/MarketDataServiceI";

export class TestDecisionEngine implements DecisionEngineI {

    
    async processSuggestions(portfolio: Portfolio, marketDataService: MarketDataServiceI) {
        return [];
    }

    
}