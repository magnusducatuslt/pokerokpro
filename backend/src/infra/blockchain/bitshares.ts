
//@ts-ignore
import {ChainStore, PrivateKey, key, Aes} from "bitsharesjs";
import axios from 'axios';
import fullAccounwDTO from './dto/get_full_account.json'
import Result from './dto/result.json'
import {User} from '../../entities'
import {RatingFromTotalPoker} from './dto/rating'
import {AccountHistory} from './dto/accountHistory'

const URL = 'http://playchain2.prod.totalpoker.io:8500'

export class Bitshares {
    private generateKeyFromPassword(accountName:string, role:string, password:string) {
        let seed = accountName + role + password;
        let privKey = PrivateKey.fromSeed(seed);
        let pubKey = privKey.toPublicKey().toString();
    
        // return {privKey, pubKey};
        return pubKey
    }

    public findUser(login:string): Promise<typeof Result>{
        //@ts-ignore
        return axios.post<typeof fullAccounwDTO>(URL,{"method": "call","params":[0,"get_full_accounts",[[login],true]],"id": 9})
            .then(result => {
                return result.data.result[0][1]
            })
    }

    public validateUser(data:{login:string,password:string,pubKey:string}){
        const roles = ["active","owner","memo"];
        const parsedKey = data.pubKey.slice(4);

        return roles.some(role=>this.generateKeyFromPassword(data.login,role,data.password).slice(4) === parsedKey)
        
    }

    public static getPubKey(result:typeof Result): string{
        //@ts-ignore
        return result.account.owner.key_auths[0][0] as string
    }

    public async receiveRating(data:Pick<User,"login">): Promise<RatingFromTotalPoker>{
        return axios.get<RatingFromTotalPoker>(`http://api.prod.totalpoker.io:8403/leaderboard/api/v1.0/current?player_name=${data.login}&request_id=0`)
            .then(result => result.data)
    }

    public async refresh(login:string, offsetId = ''): Promise<AccountHistory[]>{
        const payload = {"jsonrpc": "2.0", "params": ["history", "get_account_history", offsetId.length ? [login, "1.11.0", 100, offsetId,"1.11.0"] : [login, "1.11.0", 100, "1.11.0"]], "method": "call", "id": 10}
        return axios.post<{result:AccountHistory[]}>(URL,payload )
            .then(response => response.data.result)
    }
}
