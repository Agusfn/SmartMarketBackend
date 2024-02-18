export interface MarketDataServiceI {

    getActiveAssets(symbol: string): Promise<any>;

}