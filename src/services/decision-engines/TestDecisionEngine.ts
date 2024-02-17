import { DecisionEngineI } from "../DecisionEngineFactory";

export class TestDecisionEngine implements DecisionEngineI {

    loadPortfolio() {
        throw new Error("Method not implemented.");
    }
    async processSuggestions() {
        throw new Error("Method not implemented.");
    }
    returnSuggestions() {
        return [];
    }
    
}