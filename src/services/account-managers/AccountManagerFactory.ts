import AlpacaAccountManager from "./AlpacaAccountManager";

export interface AccountManagerI {
    buy(symbol: string, amount: number): Promise<any>,
    sell(symbol: string, amount: number): Promise<any>
}

export class AccountManagerFactory {

    static getAccountManager(account: any): AccountManagerI {
        if(account == "lpaca") {
            return new AlpacaAccountManager();
        } else {
            throw new Error("");
        }
    }

}