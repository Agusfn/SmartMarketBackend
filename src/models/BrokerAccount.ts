import { DataTypes, InferAttributes, InferCreationAttributes, Model } from "sequelize";
import sequelize from "../database/sequelize";

export enum BrokerAccountType {
    /** Development purpose alapaca broker service */
    ALPACA_PAPER = "alpaca_paper",
    /** Live (REAL MONEY) alpaca broker service */
    ALPACA_LIVE = "alpaca_live",
    //FAKE = "fake"
}

export class BrokerAccount extends Model<InferAttributes<BrokerAccount>, InferCreationAttributes<BrokerAccount>> {
    
    declare id: number | null;
    /** The account type. The account handling is hardcoded according to this code. */
    declare account_type: BrokerAccountType;

}


BrokerAccount.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    account_type: {
        type: DataTypes.STRING(100)
    }
}, {
    tableName: "broker_account",
    sequelize,
    modelName: "BrokerAccount",
    timestamps: false
});


const a = new BrokerAccount();

