import User from '../../entities/User'

export type DatabaseT = Map<string, User>

export const database:DatabaseT = new Map()