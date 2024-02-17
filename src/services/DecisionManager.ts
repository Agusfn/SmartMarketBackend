import { DecisionEngineFactory, DecisionEngineI, SuggestionI } from "./DecisionEngineFactory";
import { AccountManagerFactory, AccountManagerI } from "./account-managers/AccountManagerFactory";

export class PortfolioDecisionManager {

    private portfolio: any;
    private marketData: any; // query class for market data
    
    private suggestions: SuggestionI[] = [];

    private decisionEngine: DecisionEngineI;
    private accountManager: AccountManagerI;

    constructor(portfolio: any) {
        this.portfolio = portfolio;
        this.decisionEngine = DecisionEngineFactory.getEngine(portfolio.engine.code);
        this.accountManager = AccountManagerFactory.getAccountManager(this.portfolio.account);
    }

    public async processDecisions(): Promise<void> {
        this.decisionEngine.loadPortfolio(this.portfolio);
        await this.decisionEngine.processSuggestions();
        this.suggestions = this.decisionEngine.returnSuggestions();
    }

    public getSuggestions() {
        return this.suggestions;
    }

    public async executeSuggestions() {

        for(const suggestion of this.suggestions) {
            if(suggestion.action == "buy") {
                await this.accountManager.buy(suggestion.symbol, suggestion.qty);
            } else {
                await this.accountManager.sell(suggestion.symbol, suggestion.qty);
            }
        }

    }


}