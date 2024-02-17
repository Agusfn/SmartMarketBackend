import { DataTypes, InferAttributes, InferCreationAttributes, Model } from "sequelize";
import sequelize from "../database/sequelize";


export class Asset extends Model<InferAttributes<Asset>, InferCreationAttributes<Asset>> {
    
    declare id: number | null;
    declare symbol: string;

}


Asset.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    symbol: {
        type: DataTypes.STRING(50),
        allowNull: false
    }
}, {
    tableName: "asset",
    sequelize,
    modelName: "Asset",
    timestamps: false
});

