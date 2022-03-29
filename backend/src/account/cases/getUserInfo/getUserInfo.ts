import {Repository} from '../../repository'
import {User,Account} from '../../../entities'
import {Bitshares} from '../../../infra/blockchain'
import {OperationsReasonsE} from '../../../infra/blockchain/dto/accountHistory'

export class CaseUserInfo {
    
    constructor(private _repository:Repository, private _blockchain:Bitshares){}

    public async invoke({login}:User) : Promise<Account>{
        try{
            const account = await this._repository.getAccountInfo(login);
            const transactions = await this._blockchain.refresh(login)
            const games = transactions.reduce((acc,transaction) => {
                console.log(transaction)
                if(transaction.op[1].reason === OperationsReasonsE['Player do buy-out']){
                    acc = acc+1
                }
                return acc 
            },0)

            return Object.assign(account,{games})
        }catch(error){
            console.log(error);
            throw error
        }
    }

}