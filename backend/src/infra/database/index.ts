import {User,Account} from '../../entities'

export type DatabaseT = Map<string, User & Account >

export const database:DatabaseT = new Map()