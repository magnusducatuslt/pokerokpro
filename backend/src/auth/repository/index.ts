import User from '../../entities/User'
import {DatabaseT} from '../../infra/database'

export class Repository{
    
    constructor( private db: DatabaseT){
    }
    
    public async findUser(login:string): Promise<User | undefined>{
        return this.db.get(login)
    }

    public async createUser(data:User){
        this.db.set(data.login,data)
        return data
    }

}