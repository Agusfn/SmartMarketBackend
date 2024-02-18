
import { DataTypes, InferAttributes, InferCreationAttributes, Model } from "sequelize";
import sequelize from "../database/sequelize";


export class DecisionEngineData extends Model<InferAttributes<DecisionEngineData>, InferCreationAttributes<DecisionEngineData>> {
    
    declare id: number | null;
    /** Code that hardcode-links this entity with the actual source code of the decision engine. */
    declare code: string;
    /** Description of the implementation of the decisions, including the risk management and all relevant information. */
    declare description: string | null;
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
    description: {
        type: DataTypes.STRING(1000),
        allowNull: true
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