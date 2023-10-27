import { Sequelize, DataTypes } from "sequelize"; 

const sequelize = new Sequelize('sqlite::memory:');

const Ensemble = sequelize.define('Ensemble', {
  creationDate: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
  /** The tempo of the song, range from 0-1 */
  tempo: {
    type: DataTypes.DECIMAL, 
    allowNull: false,
  },
});
export default Ensemble;