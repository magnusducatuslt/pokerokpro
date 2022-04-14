import {Bitshares} from '../../../infra/blockchain'
import {Repository} from '../../repository'
import {JWT} from '../../../infra/jwt'
import {CaseRefreshAccountStatistics } from '../../../dashboard/cases/refreshAccountStatistics'
import {v4} from "uuid"
export class CaseLogin {
    
    constructor(private _repository:Repository,private _blockchain:Bitshares, private jwt:JWT, private _refreshAccountService:CaseRefreshAccountStatistics){}

    public async invoke({username,password}:{username:string,password:string}): Promise<{token: string | boolean}>{
        try{
            const user = await this._repository.findUser({username, password});

            if(user) {
                console.log("user exist")
                return {
                    token: this.jwt.getTokenFromData(user)
                }
            }
            console.log("user not exist")
            const result = await this._blockchain.findUser(username);
            if(result){
                const pubKey = Bitshares.getPubKey(result)
                const isCredsValid = this._blockchain.validateUser({username,password,pubKey})
                
                if(isCredsValid){
                    const info = this._refreshAccountService.getAccountInfoByAccountFromBitshares(result)
                    console.log("creating user")
                    const user  = await this._repository.createUser({
                        id: v4(),
                        username,
                        password,
                        isActive:true, 
                        name:username, 
                        email:`${username}@fake.ru`, 
                        avatar:"", 
                        registeredAt:new Date(),
                    })
                    console.log("creating account")
                    await this._repository.createAccount({
                        id: v4(),
                        accountName:user.username,
                        userId:user.id!,
                        platform:"TPA",
                        pubKey,
                        balance:info.balance,
                        games:info.games,
                        position:info.position,
                        accountId:info.id,
                        isActive:"true",
                        status:"ACTIVE"
                        
                    })
                   return {
                    token: this.jwt.getTokenFromData(user)
                  }
                }
                
            }
            console.log("creds invalid")
            return {token:false}
        }catch(error){
            console.log(error);
            throw error
        }
    }

}