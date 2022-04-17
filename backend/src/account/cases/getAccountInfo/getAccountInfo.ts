import {Repository} from '../../repository'
import {User,Account, PersonalRating} from '../../../entities'
import {Bitshares} from '../../../infra/blockchain'
import {OperationsReasonsE, AccountHistory} from '../../../infra/blockchain/dto/accountHistory'

const LIMIT = 100;

export class CaseAccountInfo {
    
    constructor(private _repository:Repository, private _blockchain:Bitshares){}

    private isLast(length:number){
        console.log('length is',length)

        return LIMIT !== length
    }

    private getIdOlderTransaction(transactions:AccountHistory[]){
        return transactions.length && transactions[transactions.length-1].id
    }

    private async getTransactions(login:string, transactions:AccountHistory[],latestId = ''):Promise<AccountHistory[]>{
        console.log('before',transactions.length)
        const result = await this._blockchain.refresh(login,latestId.length ? latestId : '' )
        if(this.isLast(result.length)){
            return transactions.concat(result);
        }
        console.log('after',transactions.length)
        const id = this.getIdOlderTransaction(result)
        //@ts-ignore
        return this.getTransactions(login, transactions.concat(result),id.length ? id : '')
    }

    public async invoke({username,id}:User) : Promise<PersonalRating>{
        try{

            const account = await this._repository.getAccount({userId:id,platform:"TPA"});
            if(!account){
                throw new Error('account not found')
            }
            const response = {
                id:account.id!,
                username:account.accountName,
                game:account.game,
                balance:account.balance,
                position:account.position
            }

            const transactions = await this.getTransactions(username,[])

            const games = transactions.reduce((acc,transaction) => {
                if(transaction.op[1].reason === OperationsReasonsE['Player do buy-out']){
                    acc = acc+1
                }
                return acc 
            },0)
            return response
        }catch(error){
            console.log(error);
            throw error
        }
    }

}