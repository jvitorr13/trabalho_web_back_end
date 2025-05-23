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
        model: Contact, // Associação com a tabela contacts
        key: "id",
      },
    },
    data: {
      type: DataTypes.DATEONLY, // Apenas data no formato YYYY-MM-DD
      allowNull: false,
    },
    hora: {
      type: DataTypes.TIME, // Apenas hora no formato HH:mm:ss
      allowNull: false,
    },
    duracao: {
      type: DataTypes.INTEGER, // Duração em minutos
      allowNull: false,
    },
    descricao: {
      type: DataTypes.TEXT,
      allowNull: true, // Campo opcional
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