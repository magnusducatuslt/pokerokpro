import { Sequelize, Model, DataTypes } from "sequelize";
import { ModelType } from "../ModelType";

export interface Participant extends Model {
  readonly id: string;

  projectId: string;
  employeeId: string;

  readonly createdAt: Date;
  readonly updatedAt: Date;
}

export type ParticipantModel = ModelType<Participant>;

export const Participant = (dbService: Sequelize) => {
  const attributes = {
    id: {
      type: DataTypes.STRING(250),
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false,
      unique: true,
    },
    projectId: {
      type: DataTypes.STRING(250),
      allowNull: false,
    },
    employeeId: {
      type: DataTypes.STRING(250),
      allowNull: false,
    },
  };

  const model = dbService.define(
    "participants",
    attributes
  ) as ParticipantModel;

  model.associate = function (models) {
    models.Participant.belongsTo(models.Employee, {
      foreignKey: "employeeId",
      targetKey: "id",
      as: "participantEmployee",
      onDelete: "cascade",
    });
    models.Participant.belongsTo(models.Project, {
      foreignKey: "projectId",
      targetKey: "id",
      as: "participantProject",
    });
  };

  return model;
};
