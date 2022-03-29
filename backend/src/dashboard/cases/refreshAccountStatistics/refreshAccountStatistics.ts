import {Bitshares} from '../../../infra/blockchain'
import {Repository} from '../../../account/repository'
import {User,Account} from '../../../entities'
import AccountInfoFromBitshares from '../../../infra/blockchain/dto/result.json'


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

    public async invoke({login}:User):Promise<Account>{
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