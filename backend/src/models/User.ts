import { Sequelize, DataTypes } from "sequelize"; 

const sequelize = new Sequelize('sqlite::memory:');

const User = sequelize.define('User', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4
  },
  /** The tempo of the song, range from 0-1 */
  tempo: {
    type: DataTypes.DECIMAL, 
    allowNull: false,
  },
});
export default User;