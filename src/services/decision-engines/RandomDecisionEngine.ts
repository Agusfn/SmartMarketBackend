import { Portfolio } from "../../models";
import { DecisionEngineI, SuggestionI } from "./DecisionEngineFactory";
import { MarketDataServiceI } from "../market-data-services/MarketDataServiceI";
import { AlpacaMarketDataService } from "../market-data-services/AlpacaMarketDataService";

export class RandomDecisionEngine implements DecisionEngineI {

    
    public async processSuggestions(portfolio: Portfolio, marketDataService: AlpacaMarketDataService): Promise<SuggestionI[]> {


        // 1) select n random symbols to buy at market price (within our spending limit)

        // 2) select n random symbols to sell at market price (within our held positions)

        console.log("Portfolio: ", JSON.stringify(portfolio, null, 4));
        
        const movements = await portfolio.getMovements();
        console.log("movements: ", JSON.stringify(movements, null, 4));

        //console.log("marketDataService", marketDataService);

        const assets = await marketDataService.getActiveAssets("NYSE");
        console.log("assets", assets)

        return [];
    }


    private async getRandomSymbolsToBuy() {
        
    }



    
}