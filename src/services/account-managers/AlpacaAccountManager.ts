import { AlpacaClient, AlpacaStream } from '@master-chief/alpaca';
import { BrokerAccountManagerI } from "./BrokerAccountManagerFactory"

export default class AlpacaAccountManager implements BrokerAccountManagerI {

    private client: AlpacaClient;

    constructor(keyId: string, secretKey: string, paper: boolean) {

        this.client = new AlpacaClient({
            credentials: {
                key: keyId,
                secret: secretKey,
                // access_token: 'xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx',
                paper: paper,
            },
            rate_limit: true,
        });

    }

    async buy(symbol: string, quantity: number): Promise<any> {
        const a = await this.client.placeOrder({
            symbol: symbol,
            qty: quantity,
            // or
            // notional: 100,
            side: 'buy',
            type: 'market',
            time_in_force: 'day',
        });
        console.log("placed buy order: ", a);
    }
    
    async sell(symbol: string, quantity: number): Promise<any> {
        const a = await this.client.placeOrder({
            symbol: symbol,
            qty: quantity,
            // or
            // notional: 100,
            side: 'sell',
            type: 'market',
            time_in_force: 'day',
        });
        console.log("placed sell order: ", a);
    }
}