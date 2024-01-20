import {
  CreationOptional,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  Model,
} from "sequelize";
import { sequelize } from "../database.js";

class User extends Model<InferAttributes<User>, InferCreationAttributes<User>> {
  // 'CreationOptional' marks the field as optional when
  // creating an instance of the model (such as using Model.create()).
  declare id: CreationOptional<string>;
  declare username: string;
  declare password: string;
}

User.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4, // Or DataTypes.UUIDV1
      primaryKey: true,
      allowNull: false,
      unique: true,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    // @todo delegate responsibility for logging in to another
    // service, such as Auth0 or Firebase.
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  { sequelize },
);

// Makes sure the true table matches the above definition.
// Setting `alter` will modify the table, rather than delete the table if it already exists.
User.sync({ alter: true, logging: false });

export default User;
