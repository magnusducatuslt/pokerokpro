import {Repository} from '../../repository'
import {User,Account} from '../../../entities'
import {Bitshares} from '../../../infra/blockchain'
import {OperationsReasonsE, AccountHistory} from '../../../infra/blockchain/dto/accountHistory'

const LIMIT = 100;

export class CaseUserInfo {
    
    constructor(private _repository:Repository, private _blockchain:Bitshares){}

    private isLast(length:number){
        console.log('length is',length)
        return LIMIT !== length
    }

    private getIdOlderTransaction(transactions:AccountHistory[]){
        return transactions.length && transactions[transactions.length-1].id
    }

    private async getTransactions(login:string, transactions:AccountHistory[],latestId = ''):Promise<AccountHistory[]>{
        console.log('after',transactions.length)
        const result = await this._blockchain.refresh(login,latestId.length ? latestId : '' )
        if(this.isLast(result.length)){
            return transactions.concat(result);
        }
        console.log('after',transactions.length)
        const id = this.getIdOlderTransaction(result)
        //@ts-ignore
        return this.getTransactions(login, transactions.concat(result),id.length ? id : '')
    }

    public async invoke({login}:User) : Promise<Account>{
        try{
            const account = await this._repository.getAccountInfo(login);
            
            const transactions = await this.getTransactions(login,[])
            console.log('transaction length',transactions.length)
            const games = transactions.reduce((acc,transaction) => {
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