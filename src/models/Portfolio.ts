import { DataTypes, InferAttributes, InferCreationAttributes, Model } from "sequelize";
import sequelize from "../database/sequelize";
import { DecisionEngineData } from "./DecisionEngineData";
import { Account } from "./Account";


export class Portfolio extends Model<InferAttributes<Portfolio>, InferCreationAttributes<Portfolio>> {
    
    declare id: number | null;
    declare available_balance: number;
    declare net_worth: number;
    declare last_net_worth_update: Date;

    // to-do: limits

}


Portfolio.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    available_balance: {
        type: DataTypes.DOUBLE,
        allowNull: false,
        defaultValue: 0
    },
    net_worth: {
        type: DataTypes.DOUBLE,
        allowNull: false,
        defaultValue: 0
    },
    last_net_worth_update: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: () => new Date()
    }
}, {
    tableName: "portfolio",
    sequelize,
    modelName: "Portfolio",
    timestamps: false
});


Portfolio.belongsTo(Account, {
    foreignKey: "account_id",
    onUpdate: "CASCADE",
    onDelete: "RESTRICT",
    as: "account"
});

Account.hasMany(Portfolio, {
    foreignKey: "account_id",
    onUpdate: "CASCADE",
    onDelete: "RESTRICT",
    as: "portfolios"
});


Portfolio.belongsTo(DecisionEngineData, {
    foreignKey: "decision_engine_data_id",
    onUpdate: "CASCADE",
    onDelete: "RESTRICT",
    as: "decision_engine_data"
});

DecisionEngineData.hasMany(Portfolio, {
    foreignKey: "decision_engine_data_id",
    onUpdate: "CASCADE",
    onDelete: "RESTRICT",
    as: "portfolios"
});