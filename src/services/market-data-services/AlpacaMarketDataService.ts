import { AlpacaClient, Asset as AlpacaAsset } from "@master-chief/alpaca";
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
                paper: true,
            },
            rate_limit: true,
        });
    }

    
    public async getActiveAssets(exchange?: string): Promise<AlpacaAsset[]> {
        const assets = await this.client.getAssets({ status: "active" });
        if(exchange) {
            return assets.filter(asset => asset.exchange == exchange);
        } else {
            return assets;
        }
    }

    public async a() {

    }

}