import {User,Account} from '../../entities'
import {DatabaseT} from '../../infra/database'

export class Repository{
    
    constructor( private db: DatabaseT){
    }
    
    public async findUser(login:string): Promise<User | undefined>{
        return this.db.get(login)
    }

    public async createUser(data:User & Account){
        this.db.set(data.login,data)
        return data
    }

    public async renewAccountStatisticByAccountInfo(data:Account){
        const user = this.db.get(data.nickname)
        const newData = Object.assign(user,data)
        this.db.set(user!.login,newData)
        return newData
    }

    public async renewAccountStatisticByRaiting(data:Pick<User,"login">){
        const user = this.db.get(data.login)
    }

    public async getAccountInfo(login:string): Promise<Account>{
        const user = this.db.get(login)
        if(!user){
            throw Error(`ACCOUNT_DOESNT_FOUND`)
        }
        
        return {
            id:"",
            nickname:"",
            games:0, 
            balance:0, 
            position:0
        }
    }

}