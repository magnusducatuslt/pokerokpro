
//@ts-ignore
import {ChainStore, PrivateKey, key, Aes} from "bitsharesjs";
import axios from 'axios';


const URL = 'playchain2.prod.totalpoker.io:8500'

export class Bitshares {
    private generateKeyFromPassword(accountName:string, role:string, password:string) {
        let seed = accountName + role + password;
        let privKey = PrivateKey.fromSeed(seed);
        let pubKey = privKey.toPublicKey().toString();
    
        // return {privKey, pubKey};
        return pubKey
    }

    public findUser(login:string){
        return axios.post(URL,{"method": "call","params":[0,"get_full_accounts",[[login],true]],"id": 9}).then(result => result)
    }

    public validateUser(data:{login:string,password:string,pubKey:string}){
        const roles = ["active","owner","memo"];

        return roles.some(role=>this.generateKeyFromPassword(data.login,role,data.password) === data.pubKey)
        
    }
}