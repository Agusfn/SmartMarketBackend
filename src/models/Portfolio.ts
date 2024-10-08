import { BelongsToGetAssociationMixin, DataTypes, HasManyGetAssociationsMixin, InferAttributes, InferCreationAttributes, Model, NonAttribute } from "sequelize";
import sequelize from "../database/sequelize";
import { DecisionEngineData } from "./DecisionEngineData";
import { BrokerAccount } from "./BrokerAccount";
import { PortfolioMovement } from "./PortfolioMovement";
import { AssetPosition } from "./AssetPosition";


export class Portfolio extends Model<InferAttributes<Portfolio>, InferCreationAttributes<Portfolio>> {
    
    declare id: number | null;
    declare decision_engine_code: number | null;
    declare name: string;
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
    decision_engine_code: {
        type: DataTypes.STRING(50),
        allowNull: true,
        references: {
            model: "decision_engine_data",
            key: "code"
        }
    },
    name: {
        type: DataTypes.STRING(100),
        allowNull: false
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
    timestamps: false,
    defaultScope: {
        include: [{
            model: DecisionEngineData,
            as: "decision_engine_data"
        }, {
            model: BrokerAccount,
            as: "broker_account"
        }, {
            model: AssetPosition,
            as: "asset_positions"
        }]
    }
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
    foreignKey: "decision_engine_code",
    onUpdate: "CASCADE",
    onDelete: "RESTRICT",
    as: "decision_engine_data"
});

DecisionEngineData.hasMany(Portfolio, {
    foreignKey: "decision_engine_code",
    onUpdate: "CASCADE",
    onDelete: "RESTRICT",
    as: "portfolios"
});

AssetPosition.belongsTo(Portfolio, {
    foreignKey: "portfolio_id",
    onUpdate: "CASCADE",
    onDelete: "RESTRICT",
    as: "portfolio"
});

Portfolio.hasMany(AssetPosition, {
    foreignKey: "portfolio_id",
    onUpdate: "CASCADE",
    onDelete: "RESTRICT",
    as: "asset_positions"
});