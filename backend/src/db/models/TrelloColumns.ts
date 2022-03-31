import { Sequelize, Model, DataTypes } from "sequelize";
import { ModelType } from "../ModelType";

interface TrelloColumn extends Model {
  readonly id: string;

  name: string;
  color: string;
  isRequired: boolean;
  order: string;
  status: number;
  statusValue: string;

  readonly createdAt: Date;
  readonly updatedAt: Date;
}

export type TrelloColumnModel = ModelType<TrelloColumn>;

export const TrelloColumn = (dbService: Sequelize) => {
  const attributes = {
    id: {
      type: DataTypes.STRING(250),
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false,
      unique: true,
    },
    name: { type: DataTypes.STRING(250) },
    color: { type: DataTypes.STRING(250) },
    isRequired: { type: DataTypes.BOOLEAN },
    order: { type: DataTypes.STRING(250) },
    status: { type: DataTypes.INTEGER },
    statusValue: { type: DataTypes.STRING(250) },
  };

  const model = dbService.define(
    "trelloColumns",
    attributes
  ) as TrelloColumnModel;

  return model;
};
