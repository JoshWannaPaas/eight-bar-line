import { Model, InferCreationAttributes, CreationOptional, InferAttributes, DataTypes } from "sequelize";
import { sequelize } from "../database.js";
import { Instrument } from "common/dist/index.js";
import User from "./User.js";

class Barline extends Model<InferAttributes<Barline>, InferCreationAttributes<Barline>> {
  /** The unique identifier for the Barline */
  declare id: CreationOptional<string>;
  /** The original author of the Barline */
  declare author: string;
  /** The instrument the Barline was written with */
  declare instrument: Instrument;

  declare tempo: number;

  declare notes: string;
}

Barline.init({
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4, // Or DataTypes.UUIDV1
    primaryKey: true,
    allowNull: false,
    unique: true,
  },
  author: {
    type: DataTypes.UUID,
    allowNull: false,
  },
  instrument: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  tempo: {
    /** The tempo of the Barline */
    type: DataTypes.FLOAT,
    allowNull: true,
  },
  notes: {
    /** JSON string of a 2D matrix of attacks, sustains, and rests */
    type: DataTypes.STRING,
    allowNull: false,
  },
}, { sequelize });

Barline.sync({ alter: true, logging: false });

Barline.belongsTo(User, { foreignKey: 'authorId' });

export default Barline;
