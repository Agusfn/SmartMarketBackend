export interface MarketDataServiceI {

    getHistoryOfStock(symbol: string): Promise<any>;

}