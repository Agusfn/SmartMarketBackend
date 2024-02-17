import { DataTypes, InferAttributes, InferCreationAttributes, Model } from "sequelize";
import sequelize from "../database/sequelize";

export enum AccountType {
    /** Development purpose alapaca broker service */
    ALPACA_PAPER = "alpaca_paper",
    /** Live (REAL MONEY) alpaca broker service */
    ALPACA_LIVE = "alpaca_live",
    //FAKE = "fake"
}

export class Account extends Model<InferAttributes<Account>, InferCreationAttributes<Account>> {
    
    declare id: number | null;
    declare account_type: AccountType;

}


Account.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    account_type: {
        type: DataTypes.STRING(100)
    }
}, {
    tableName: "account",
    sequelize,
    modelName: "Account",
    timestamps: false
});


const a = new Account();

