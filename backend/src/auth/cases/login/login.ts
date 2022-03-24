import {Bitshares} from '../../blockchain'

export class CaseLogin {
    
    constructor(private _blockchain:Bitshares){}

    public async invoke({login,password}:{login:string,password:string}){
        const account = {}
        const result = this._blockchain.findUser(login);
        return {token:'blabla'}
    }

}