import { DataTypes } from "sequelize";
import { sequelize } from "../config/config";

const Adress = sequelize.define(
  'adresses',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    state: {
      type: DataTypes.STRING,
      allowNull: false
    },
    city: {
      type: DataTypes.STRING,
      allowNull: false
    },
    street: {
      type: DataTypes.STRING,
      allowNull: false
    },
    district: {
      type: DataTypes.STRING,
      allowNull: false
    },
    number_forget: {
      type: DataTypes.STRING
    },
  },
  {
    freezeTableName: true,
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  },
  
);


export default Adress;