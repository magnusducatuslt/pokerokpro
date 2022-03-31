import {User,Account} from '../../entities'

import { Sequelize } from "sequelize";
import { config } from "../../config/config";
import * as connectionConfigs from "./config/config";

export const getDatabase = (
    //@ts-ignore
  connectionConfig = connectionConfigs[config.env]
): Sequelize => new Sequelize(connectionConfig);


export type DatabaseT = Map<string, User & Account >

export const database:DatabaseT = new Map()