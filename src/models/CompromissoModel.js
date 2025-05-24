import { DataTypes } from "sequelize";
import { sequelize } from "../config/config.js";
import Contact from "./ContactModel.js";

const Compromisso = sequelize.define(
  "compromissos",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    titulo: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    contato_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Contact, 
        key: "id",
      },
    },
    data: {
      type: DataTypes.DATEONLY, 
      allowNull: false,
    },
    hora: {
      type: DataTypes.TIME, 
      allowNull: false,
    },
    duracao: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    descricao: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
  },
  {
    freezeTableName: true,
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
  }
);

Compromisso.belongsTo(Contact, { foreignKey: "contato_id", as: "contacts" });

export default Compromisso;