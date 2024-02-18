import { BelongsToGetAssociationMixin, DataTypes, InferAttributes, InferCreationAttributes, Model } from "sequelize";
import sequelize from "../database/sequelize";
import { Portfolio } from "./Portfolio";
import { Asset } from "./Asset";


export class AssetPosition extends Model<InferAttributes<AssetPosition>, InferCreationAttributes<AssetPosition>> {
    
    declare id: number | null;
    declare portfolio_id: number;
    declare asset_id: number;
    declare asset_amount: number;
    declare asset_unit_value: number;
    declare asset_total_value: number;
    declare last_asset_value_update: Date;

    // mixins
    declare getPortfolio: BelongsToGetAssociationMixin<Portfolio>;
    declare getAsset: BelongsToGetAssociationMixin<Asset>;

}


AssetPosition.init({
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
    asset_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: "asset",
            key: "id"
        }
    },
    asset_amount: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    asset_unit_value: {
        type: DataTypes.DOUBLE,
        allowNull: false
    },
    asset_total_value: {
        type: DataTypes.DOUBLE,
        allowNull: false
    },
    last_asset_value_update: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: () => new Date()
    }
}, {
    tableName: "asset_position",
    sequelize,
    modelName: "AssetPosition",
    timestamps: false
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


AssetPosition.belongsTo(Asset, {
    foreignKey: "asset_id",
    onUpdate: "CASCADE",
    onDelete: "RESTRICT",
    as: "asset"
});