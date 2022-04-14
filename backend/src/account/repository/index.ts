import { User,Account } from '../../entities'
import { DbType } from "../../db";
import { UserInstance, UserAttributes } from "../../db/models/User";
import {AccountInstance, AccountAttributes, ACCOUNTS_BELONGS_TO_USER} from "../../db/models/Account";

export class Repository{
    
    constructor( private db: DbType) {
    }
    
    //TODO add password
    public async findUser({username, password}: Partial<UserAttributes>): Promise<UserInstance | null>{
        return this.db.User.findOne({ where: password ?{username, password} : {username}})
    }

    public async createUser(userData: UserAttributes): Promise<UserInstance>{
        return await this.db.User.create(userData);
    }

    public async createAccount(accountData: AccountAttributes): Promise<AccountInstance>{
        return this.db.Account.create(accountData);
    }

    public async renewAccountStatisticByAccountInfo(data:User): Promise<AccountInstance>{
        const user = await this.db.User.findOne({where: {username: data.username}})
        if(!user){
            throw new Error('USER_DOESNT_FOUND')
        }
        const account = await this.db.Account.findOne({where: {userId: user.id}})
        if(!account){
            throw new Error(`ACCOUNT_DOESNT_EXIST`)
        }
        // const newData = Object.assign(user,data)
        // this.db.set(user!.login,newData)
        return {
            id:account.id,
            //@ts-ignore
            username:account.username,
            games:account.games, 
            balance:account.balance, 
            position:account.position
        }
    }
    //@ts-ignore
    public async renewAccountStatisticByRaiting(data:Pick<User,"login">){
        // const user = this.db.get(data.login)
    }

    public async getAccountInfo(data:AccountAttributes): Promise<AccountInstance>{
        const account = await this.db.Account.findOne({where: {userId: data.userId}})
        
        if(!account){
            throw Error(`ACCOUNT_DOESNT_FOUND`)
        }

        return {
            id:account.id,
            //@ts-ignore
            username:account.accountName,
            games:account.games,
            balance:account.balance,
            position:account.position
        }
    }

}