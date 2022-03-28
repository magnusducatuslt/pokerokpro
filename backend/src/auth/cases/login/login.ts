import {Bitshares} from '../../blockchain'
import {Repository} from '../../repository'
import {JWT} from '../../../infra/jwt'

export class CaseLogin {
    
    constructor(private _repository:Repository,private _blockchain:Bitshares, private jwt:JWT){}

    public async invoke({login,password}:{login:string,password:string}){
        const user = await this._repository.findUser(login);
        console.log(user)
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
               const user  = await this._repository.createUser(Object.assign({login,password,pubKey},{id:`${Date.now()}`}))
               return {
                token: this.jwt.getTokenFromData(user)
              }
            }
            
        }

        return {token:false}
    }

}