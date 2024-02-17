import { TestDecisionEngine } from "./decision-engines/TestDecisionEngine";

export interface SuggestionI {
    /** Action to perform. */
    action: "buy" | "sell",
    /** Stock option symbol. Only stock market, no crypto for now. */
    symbol: string,
    /** Amount of that option to buy/sell. */
    qty: number
}

export interface DecisionEngineI {
    loadPortfolio(portfolio: any): any,
    processSuggestions(): Promise<any>,
    returnSuggestions(): SuggestionI[]
}


export class DecisionEngineFactory {

    static getEngine(engineCode: string): DecisionEngineI {
        if(engineCode == "") {
            return new TestDecisionEngine();
        } else {
            throw new Error("");
        }
    }

}