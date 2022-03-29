import {Bitshares} from '../../blockchain'
import {Repository} from '../../repository'
import {User,Account} from '../../../entities'
import AccountInfoFromBitshares from '../../blockchain/dto/result.json'


export class CaseRefreshAccountStatistics {
    
    constructor(private _repository:Repository,private _blockchain:Bitshares){}

    public getAccountInfoByAccountFromBitshares({account, balances}:typeof AccountInfoFromBitshares):Account{
       
        return {
            id: account.id,
            nickname:account.name,
            games:0,
            position:0,
            //@ts-ignore
            balance:balances.length ? balances[0].balance : 0
        }
    }

    public async invoke({login}:User){
        try{

           
            const result = await this._blockchain.findUser(login);
            const info = this.getAccountInfoByAccountFromBitshares(result)

            const data = await this._repository.renewAccountStatisticByAccountInfo(info)
            
            return data
        }catch(error){
            console.log(error);
            throw error
        }
    }

}