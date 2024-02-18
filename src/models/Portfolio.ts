import { BelongsToGetAssociationMixin, DataTypes, HasManyGetAssociationsMixin, InferAttributes, InferCreationAttributes, Model, NonAttribute } from "sequelize";
import sequelize from "../database/sequelize";
import { DecisionEngineData } from "./DecisionEngineData";
import { BrokerAccount } from "./BrokerAccount";
import { PortfolioMovement } from "./PortfolioMovement";
import { AssetPosition } from "./AssetPosition";


export class Portfolio extends Model<InferAttributes<Portfolio>, InferCreationAttributes<Portfolio>> {
    
    declare id: number | null;
    declare available_balance: number;
    declare net_worth: number;
    declare last_net_worth_update: Date;

    // to-do: limits

    // eager loaded
    declare broker_account?: NonAttribute<BrokerAccount>;
    declare decision_engine_data?: NonAttribute<DecisionEngineData>;
    declare asset_positions?: NonAttribute<AssetPosition[]>;

    // mixins
    declare getAccount: BelongsToGetAssociationMixin<BrokerAccount>;
    declare getDecisionEngineData: BelongsToGetAssociationMixin<DecisionEngineData>;
    declare getMovements: HasManyGetAssociationsMixin<PortfolioMovement>;
    declare getAssetPositions: HasManyGetAssociationsMixin<AssetPosition>;

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


Portfolio.belongsTo(BrokerAccount, {
    foreignKey: "broker_account_id",
    onUpdate: "CASCADE",
    onDelete: "RESTRICT",
    as: "broker_account"
});

BrokerAccount.hasMany(Portfolio, {
    foreignKey: "broker_account_id",
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
