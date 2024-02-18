import { BelongsToGetAssociationMixin, DataTypes, InferAttributes, InferCreationAttributes, Model, NonAttribute } from "sequelize";
import sequelize from "../database/sequelize";
import { Portfolio } from "./Portfolio";
import { Asset } from "./Asset";

export enum MovementType {
    DEPOSIT = "deposit",
    WITHDRAW = "withdraw",
    ASSET_BUY = "asset_buy",
    ASSET_SELL = "asset_sell"
}

export class PortfolioMovement extends Model<InferAttributes<PortfolioMovement>, InferCreationAttributes<PortfolioMovement>> {
    
    declare id: number | null;
    declare portfolio_id: number;
    declare movement_type: MovementType;
    declare date: Date;
    declare movement_amount: number;
    declare asset_id: number | null;

    // to-do: limits

    // eager load
    declare asset?: NonAttribute<Asset>;

    // mixins
    declare getPortfolio: BelongsToGetAssociationMixin<Portfolio>;
    declare getAsset: BelongsToGetAssociationMixin<Asset>;

}


PortfolioMovement.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    portfolio_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: "portfolio",
            key: "id"
        }
    },
    movement_type: {
        type: DataTypes.STRING(50),
        allowNull: false
    },
    date: {
        type: DataTypes.DATE,
        allowNull: false
    },
    movement_amount: {
        type: DataTypes.DOUBLE,
        allowNull: false
    },
    asset_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
            model: "asset",
            key: "id"
        }
    }
}, {
    tableName: "portfolio_movement",
    sequelize,
    modelName: "PortfolioMovement",
    timestamps: false
});


PortfolioMovement.belongsTo(Portfolio, {
    foreignKey: "portfolio_id",
    onUpdate: "CASCADE",
    onDelete: "RESTRICT",
    as: "portfolio"
});

Portfolio.hasMany(PortfolioMovement, {
    foreignKey: "portfolio_id",
    onUpdate: "CASCADE",
    onDelete: "RESTRICT",
    as: "movements"
});


PortfolioMovement.belongsTo(Asset, {
    foreignKey: "asset_id",
    onUpdate: "CASCADE",
    onDelete: "RESTRICT",
    as: "asset"
});