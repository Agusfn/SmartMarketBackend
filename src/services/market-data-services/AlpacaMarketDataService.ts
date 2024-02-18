import { AlpacaClient } from "@master-chief/alpaca";
import { MarketDataServiceI } from "./MarketDataServiceI";

/**
 * Class that queries information about the market data of stock. We may abstract it and make other implementations if necessary.
 */
export class AlpacaMarketDataService implements MarketDataServiceI {

    private client: AlpacaClient;

    constructor() {
        this.client = new AlpacaClient({
            credentials: {
                key: process.env.ALPACA_KEY_PAPER!,
                secret: process.env.ALPACA_SECRET_PAPER!,
                // access_token: 'xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx',
                paper: false,
            },
            rate_limit: true,
        });
    }

    public async getHistoryOfStock(symbol: string): Promise<any> {

    }

}