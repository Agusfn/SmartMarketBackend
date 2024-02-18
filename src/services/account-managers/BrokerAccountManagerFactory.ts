import { BrokerAccountType } from "../../models";
import AlpacaAccountManager from "./AlpacaAccountManager";

export interface BrokerAccountManagerI {
    buy(symbol: string, amount: number): Promise<any>,
    sell(symbol: string, amount: number): Promise<any>
}

export class BrokerAccountManagerFactory {

    /**
     * Return an instance of the corresponding account manager according to the accountType
     * @param accountType 
     * @returns 
     */
    static getManager(accountType: BrokerAccountType): BrokerAccountManagerI {

        if(accountType == BrokerAccountType.ALPACA_PAPER) {
            return new AlpacaAccountManager(process.env.ALPACA_KEY_PAPER!, process.env.ALPACA_SECRET_PAPER!, true);
        } else if(accountType == BrokerAccountType.ALPACA_LIVE) {
            return new AlpacaAccountManager(process.env.ALPACA_KEY_LIVE!, process.env.ALPACA_SECRET_LIVE!, false);
        } else {
            throw new Error("Account type '"+accountType+"' is not supported.");
        }

    }

}