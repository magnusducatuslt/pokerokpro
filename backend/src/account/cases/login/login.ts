import {Bitshares} from '../../../infra/blockchain'
import {Repository} from '../../repository'
import {JWT} from '../../../infra/jwt'
import {CaseRefreshAccountStatistics } from '../../../dashboard/cases/refreshAccountStatistics'

export class CaseLogin {
    
    constructor(private _repository:Repository,private _blockchain:Bitshares, private jwt:JWT, private _refreshAccountService:CaseRefreshAccountStatistics){}

    public async invoke({login,password}:{login:string,password:string}): Promise<{token: string | boolean}>{
        try{
            const user = await this._repository.findUser(login);

            if(user) {
                return {
                    token: this.jwt.getTokenFromData(user)
                }
            }
    
            const result = await this._blockchain.findUser(login);
            if(result){
                const pubKey = Bitshares.getPubKey(result)
                const isCredsValid = this._blockchain.validateUser({login,password,pubKey})
            
                if(isCredsValid){
                   const user  = await this._repository.createUser(
                       Object.assign(
                        {login,password,pubKey},
                        this._refreshAccountService.getAccountInfoByAccountFromBitshares(result)
                        )
                    )
                   return {
                    token: this.jwt.getTokenFromData(user)
                  }
                }
                
            }
            return {token:false}
        }catch(error){
            console.log(error);
            throw error
        }
    }

}