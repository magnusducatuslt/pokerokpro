import { Sequelize, Model, DataTypes } from "sequelize";
import { ModelType } from "../ModelType";

interface SectionTag extends Model {
  readonly id: string;

  tagId: string;
  sectionId: string;

  readonly createdAt: Date;
  readonly updatedAt: Date;
}

export type SectionTagModel = ModelType<SectionTag>;

export const SectionTag = (dbService: Sequelize) => {
  const attributes = {
    id: {
      type: DataTypes.STRING(250),
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false,
      unique: true,
    },
    tagId: {
      type: DataTypes.STRING(250),
      allowNull: false,
    },
    sectionId: {
      type: DataTypes.STRING(250),
      allowNull: false,
    },
  };
  const model = dbService.define("sectionTags", attributes) as SectionTagModel;

  return model;
};
