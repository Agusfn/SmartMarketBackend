import { Portfolio } from "../../models";
import { RandomDecisionEngine } from "./RandomDecisionEngine";
import { MarketDataServiceI } from "../market-data-services/MarketDataServiceI";
import { DecisionEngineCodes } from "../../types";

export interface SuggestionI {
    /** Action to perform. */
    action: "buy" | "sell",
    /** Stock option symbol. Only stock market, no crypto for now. */
    symbol: string,
    /** Amount of that option to buy/sell. */
    qty: number
}

export interface DecisionEngineI {
    processSuggestions(portfolio: Portfolio, marketDataService: MarketDataServiceI): Promise<SuggestionI[]>;
}


export class DecisionEngineFactory {

    static getEngine(engineCode: string): DecisionEngineI {
        if(engineCode == DecisionEngineCodes.RANDOM_ENGINE) {
            return new RandomDecisionEngine();
        } else {
            throw new Error("Decision engine code '"+engineCode+"' doesn't exist in system.");
        }
    }

}