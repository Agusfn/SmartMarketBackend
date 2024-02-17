
import { DataTypes, InferAttributes, InferCreationAttributes, Model } from "sequelize";
import sequelize from "../database/sequelize";


export class DecisionEngineData extends Model<InferAttributes<DecisionEngineData>, InferCreationAttributes<DecisionEngineData>> {
    
    declare id: number | null;
    declare code: string;
    declare run_each_hours: number;

}


DecisionEngineData.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    code: {
        type: DataTypes.STRING(50),
        allowNull: false
    },
    run_each_hours: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
}, {
    tableName: "decision_engine_data",
    sequelize,
    modelName: "DecisionEngineData",
    timestamps: false
});