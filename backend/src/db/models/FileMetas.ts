import { Sequelize, Model, DataTypes } from "sequelize";
import { ModelType } from "../ModelType";
import { KUser } from "./KUsers";
import { Company } from "./Companies";
import { Project } from "./Projects";
import { File } from "./Files";

export const FILE_METAS_HAS_MANY_FILES = "fileMetaFiles";
export interface FileMetaRelationsI {
  fileMetaKuser: KUser[];
  fileMetaCompany: Company[];
  fileMetaProject: Project[];
  fileMetaFiles: File[];
}
export interface FileMeta extends Model, FileMetaRelationsI {
  readonly id: string;

  name: string;
  origin: string;
  size: number;
  type: string;
  createrId: string;
  isArchived: boolean;
  isProcessed: boolean;
  status: string;
  error: any;
  fileMetaGroupIds: (string | null)[];

  readonly createdAt: Date;
  readonly updatedAt: Date;
}

export type FileMetaModel = ModelType<FileMeta>;

export const FileMeta = (dbService: Sequelize) => {
  const attributes = {
    id: {
      type: DataTypes.STRING(250),
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false,
      unique: true,
    },
    origin: DataTypes.STRING(250),
    name: DataTypes.STRING(250),
    size: { type: DataTypes.INTEGER },
    type: DataTypes.STRING(250),
    createrId: DataTypes.STRING(250),
    status: {
      type: DataTypes.ENUM,
      values: ["created", "uploaded", "dead"],
      defaultValue: "created",
    },
    error: DataTypes.JSON,
    isProcessed: { type: DataTypes.BOOLEAN, defaultValue: false },
    isArchived: { type: DataTypes.BOOLEAN, defaultValue: true },
    fileMetaGroupIds: {
      type: DataTypes.ARRAY(DataTypes.STRING(250)),
    },
  };

  const model = dbService.define("fileMetas", attributes) as FileMetaModel;

  model.associate = function (models) {
    models.FileMeta.belongsToMany(models.KUser, {
      through: models.KUserOwnership,
      foreignKey: "fileMetaId",
      targetKey: "id",
      as: "fileMetaKuser",
      onDelete: "cascade",
    });
    models.FileMeta.hasMany(models.File, {
      foreignKey: "metaId",
      as: FILE_METAS_HAS_MANY_FILES,
      onDelete: "cascade",
    });
    models.FileMeta.belongsTo(models.KUser, {
      foreignKey: "createrId",
      targetKey: "id",
      as: "fileMetaCreater",
      onDelete: "cascade",
    });
    models.FileMeta.belongsToMany(models.Company, {
      through: models.CompanyOwnership,
      foreignKey: "fileMetaId",
      targetKey: "id",
      as: "fileMetaCompany",
      onDelete: "cascade",
    });
    models.FileMeta.belongsToMany(models.Project, {
      through: models.ProjectOwnership,
      foreignKey: "fileMetaId",
      targetKey: "id",
      as: "fileMetaProject",
      onDelete: "cascade",
    });
    models.FileMeta.belongsToMany(models.EditorTemplate, {
      through: models.TemplateOwnership,
      foreignKey: "fileMetaId",
      targetKey: "id",
      as: "fileMetaToTemplate",
      onDelete: "cascade",
    });
  };
  return model;
};
