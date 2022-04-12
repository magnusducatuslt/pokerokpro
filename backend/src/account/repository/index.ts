import { User,Account } from '../../entities'
import { DbType } from "../../db";
import { UserInstance } from "../../db/models/User";

export class Repository{
    
    constructor( private db: DbType) {
    }
    
    public async findUser(login:string, password: string): Promise<UserInstance | null>{
        return this.db.User.findOne({ where: {username: login, password: password}})
    }

    public async createUser(userData: UserInstance): Promise<UserInstance>{
        // this.db.set(data.login,data)
        return await this.db.User.create(userData);
    }

    public async renewAccountStatisticByAccountInfo(data:Account): Promise<Account>{
        const user = this.db.User.findOne({where: {username: data.username}})
        const newData = Object.assign(user,data)
        // this.db.set(user!.login,newData)
        return {
            id:newData.id,
            username:newData.username,
            games:newData.games, 
            balance:newData.balance, 
            position:newData.position
        }
    }

    public async renewAccountStatisticByRaiting(data:Pick<User,"login">){
        // const user = this.db.get(data.login)
    }

    public async getAccountInfo(login:string): Promise<Account>{
        const user = await this.db.User.findOne({where: {username: login}})
        if(!user){
            throw Error(`ACCOUNT_DOESNT_FOUND`)
        }

        return {
            id:user.id,
            username:user.username,
            games:user.games,
            balance:user.balance,
            position:user.position
        }
    }

}