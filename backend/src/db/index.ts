import "module-alias/register";
import "@alias";
import { getDatabase } from "@core/modules/database";
import { Sequelize, Options } from "sequelize";

import { Agreement } from "./models/Agremeents";
import { Answer } from "./models/Answers";
import { Approval } from "./models/Approval";
import { CommentMarker } from "./models/CommentMarkers";
import { Comment } from "./models/Comments";
import { Company } from "./models/Companies";
import { CompanyOwnership } from "./models/CompanyOwnerships";
import { CompanyTag } from "./models/CompanyTags";
import { Contract } from "./models/Contracts";
import { EditorBlock } from "./models/EditorBlock";
import { EditorBlockTest } from "./models/EditorBlockTests";
import { EditorElement } from "./models/EditorElement";
import { EditorElementType } from "./models/EditorElementType";
import { EditorSection } from "./models/EditorSections";
import { EditorTemplate } from "./models/EditorTemplates";
import { EditorTemplateGroup } from "./models/EditorTemplateGroups";
import { Employee } from "./models/Employees";
import { EmployerInfo } from "./models/EmployerInfos";
import { EmployeeTag } from "./models/EmployeeTags";
import { FileMeta } from "./models/FileMetas";
import { FileMetaGroup } from "./models/FileMetaGroups";
import { File } from "./models/Files";
import { Format } from "./models/Formats";
import { HistoryEmail } from "./models/HistoryEmails";
import { KUserOwnership } from "./models/KUserOwnerships";
import { KUser } from "./models/KUsers";
import { Marker } from "./models/Markers";
import { Notification } from "./models/Notifications";
import { NotificationTopics } from "./models/NotificationTopics";
import { NotificationGroups } from "./models/NotificationGroups";
import { NotificationSubscriptions } from "./models/NotificationSubscriptions";
import { NotificationWebhooks } from "./models/NotificationWebhooks";
import { Participant } from "./models/Participants";
import { Permission } from "./models/Permissions";
import { Position } from "./models/Positions";
import { Privilege } from "./models/Privileges";
import { Project } from "./models/Projects";
import { ProjectOwnership } from "./models/ProjectOwnerships";
import { ProjectGroupOwnership } from "./models/ProjectGroupOwnerships";
import { ProjectGroup } from "./models/ProjectGroups";
import { ProjectGroupTag } from "./models/ProjectGroupTags";
import { Question } from "./models/Questions";
import { Role } from "./models/Roles";
import { SectionTag } from "./models/SectionTags";
import { Tag } from "./models/Tags";
import { TaskAssign } from "./models/TaskAssigneds";
import { TaskMarker } from "./models/TaskMarkers";
import { TaskOwnership } from "./models/TaskOwnerships";
import { Task } from "./models/Tasks";
import { TaskTodo } from "./models/TaskTodos";
import { TemplateOwnership } from "./models/TemplateOwnerships";
import { TrelloColumn } from "./models/TrelloColumns";
import { UserTag } from "./models/UserTags";
import { Variant } from "./models/Variants";
import { ProjectTag } from "./models/ProjectTags";
import { ProjectSetting } from "./models/ProjectSettings";
import { Webhooks } from "./models/Webhooks";
import { ScormBuilds } from "./models/ScormBuilds";
import { PublicUrl } from "./models/PublicUrl";

const database = getDatabase();

const db = (sequelize: Sequelize = database) => ({
  PublicUrl: PublicUrl(sequelize),
  ScormBuilds: ScormBuilds(sequelize),
  Agreement: Agreement(sequelize),
  Answer: Answer(sequelize),
  Approval: Approval(sequelize),
  CommentMarker: CommentMarker(sequelize),
  Comment: Comment(sequelize),
  Company: Company(sequelize),
  CompanyOwnership: CompanyOwnership(sequelize),
  CompanyTag: CompanyTag(sequelize),
  Contract: Contract(sequelize),
  EditorBlock: EditorBlock(sequelize),
  EditorBlockTest: EditorBlockTest(sequelize),
  EditorElement: EditorElement(sequelize),
  EditorElementType: EditorElementType(sequelize),
  EditorSection: EditorSection(sequelize),
  EditorTemplate: EditorTemplate(sequelize),
  EditorTemplateGroup: EditorTemplateGroup(sequelize),
  Employee: Employee(sequelize),
  EmployerInfo: EmployerInfo(sequelize),
  EmployeeTag: EmployeeTag(sequelize),
  FileMeta: FileMeta(sequelize),
  FileMetaGroup: FileMetaGroup(sequelize),
  File: File(sequelize),
  Format: Format(sequelize),
  HistoryEmail: HistoryEmail(sequelize),
  KUserOwnership: KUserOwnership(sequelize),
  KUser: KUser(sequelize),
  Marker: Marker(sequelize),
  Notification: Notification(sequelize),
  NotificationTopic: NotificationTopics(sequelize),
  NotificationGroup: NotificationGroups(sequelize),
  NotificationSubscription: NotificationSubscriptions(sequelize),
  NotificationWebhook: NotificationWebhooks(sequelize),
  Participant: Participant(sequelize),
  Permission: Permission(sequelize),
  Position: Position(sequelize),
  Privilege: Privilege(sequelize),
  Project: Project(sequelize),
  ProjectTag: ProjectTag(sequelize),
  ProjectSetting: ProjectSetting(sequelize),
  ProjectOwnership: ProjectOwnership(sequelize),
  ProjectGroupOwnership: ProjectGroupOwnership(sequelize),
  ProjectGroup: ProjectGroup(sequelize),
  ProjectGroupTag: ProjectGroupTag(sequelize),
  Question: Question(sequelize),
  Role: Role(sequelize),
  SectionTag: SectionTag(sequelize),
  Tag: Tag(sequelize),
  TaskAssign: TaskAssign(sequelize),
  TaskMarker: TaskMarker(sequelize),
  TaskOwnership: TaskOwnership(sequelize),
  Task: Task(sequelize),
  TaskTodo: TaskTodo(sequelize),
  TrelloColumn: TrelloColumn(sequelize),
  TemplateOwnership: TemplateOwnership(sequelize),
  UserTag: UserTag(sequelize),
  Variant: Variant(sequelize),
  Webhook: Webhooks(sequelize),
});

const orm = db();

type DbType = ReturnType<typeof db> & {
  sequelize: Sequelize;
};

Object.keys(orm).forEach((modelName) => {
  const internalDb = orm as DbType & { [key: string]: any };
  if (internalDb[modelName].associate) {
    internalDb[modelName].associate(orm);
  }
});

const client: DbType = Object.assign({}, orm, { sequelize: database });

const initDatabase = (connectionConfig?: Options): DbType => {
  const sequelizeClient = getDatabase(connectionConfig);
  const databaseClient = db(sequelizeClient);

  Object.keys(databaseClient).forEach((modelName) => {
    const internalDb = databaseClient as DbType & { [key: string]: any };
    if (internalDb[modelName].associate) {
      internalDb[modelName].associate(databaseClient);
    }
  });

  return Object.assign({}, databaseClient, { sequelize: sequelizeClient });
};

type DbModels = typeof orm;

export * from "./ModelType";
export { client as db, DbType, initDatabase, DbModels };
