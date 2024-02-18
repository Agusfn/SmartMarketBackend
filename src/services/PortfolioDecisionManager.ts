import { Portfolio } from "../models";
import { DecisionEngineFactory, DecisionEngineI, SuggestionI } from "./decision-engines/DecisionEngineFactory";
import { BrokerAccountManagerFactory, BrokerAccountManagerI } from "./account-managers/BrokerAccountManagerFactory";
import { AlpacaMarketDataService } from "./market-data-services/AlpacaMarketDataService";

export class PortfolioDecisionManager {

    private suggestions: SuggestionI[] = [];

    // Services
    private decisionEngine: DecisionEngineI;
    private accountManager: BrokerAccountManagerI;
    private marketDataService = new AlpacaMarketDataService();

    constructor(private portfolio: Portfolio) {
        this.portfolio = portfolio;
        this.decisionEngine = DecisionEngineFactory.getEngine(portfolio.decision_engine_data!.code);
        this.accountManager = BrokerAccountManagerFactory.getManager(this.portfolio.broker_account!.account_type);
    }

    public async processDecisions(): Promise<void> {
        this.suggestions = await this.decisionEngine.processSuggestions(this.portfolio, this.marketDataService);
    }

    public getSuggestions() {
        return this.suggestions;
    }

    public async executeSuggestions() {

        // to-do: validate suggestions according to funds and positions

        for(const suggestion of this.suggestions) {
            if(suggestion.action == "buy") {
                await this.accountManager.buy(suggestion.symbol, suggestion.qty);
            } else {
                await this.accountManager.sell(suggestion.symbol, suggestion.qty);
            }
        }

    }


}