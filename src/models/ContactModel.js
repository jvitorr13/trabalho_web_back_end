import { DataTypes } from "sequelize";
import { sequelize } from "../config/config.js";

const Contact = sequelize.define(
  "contacts",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    nome: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "Nome Padrão",
    },
    sobrenome: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "Sobrenome Padrão", 
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false, 
      validate: {
        isEmail: true, 
      },
    },
    telefone: {
      type: DataTypes.STRING,
      allowNull: true, 
    },
    observacao: {
      type: DataTypes.TEXT,
      allowNull: false, 
    },
    categoria: {
      type: DataTypes.STRING,
      allowNull: false, 
    },
  },
  {
    freezeTableName: true,
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
  }
);

export default Contact;