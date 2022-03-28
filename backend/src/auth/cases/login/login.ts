import {Bitshares} from '../../blockchain'
import {Repository} from '../../repository'
import jwt from 'jsonwebtoken'

const tokenKey = '1a2b-3c4d-5e6f-7g8h-asdasd-asdasd-s'
export class CaseLogin {
    
    constructor(private _repository:Repository,private _blockchain:Bitshares){}

    public async invoke({login,password}:{login:string,password:string}){
        const user = await this._repository.findUser(login);
        console.log(user)
        if(user) {
            return {
                id: user.id,
                login: user.login,
                token: jwt.sign({ id: user.id }, tokenKey),
            }
        }

        const result = await this._blockchain.findUser(login);
        if(result){
            const pubKey = Bitshares.getPubKey(result)
            const isCredsValid = this._blockchain.validateUser({login,password,pubKey})
            
            if(isCredsValid){
               const user  = await this._repository.createUser(Object.assign({login,password,pubKey},{id:`${Date.now()}`}))
               return {
                id: user.id,
                login: user.login,
                token: jwt.sign({ id: user.id }, tokenKey),
              }
            }
            
        }

        return {token:false}
    }

}