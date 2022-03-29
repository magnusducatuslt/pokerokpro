import {Repository} from '../../../account/repository'
import {User, Account} from '../../../entities'
import {Bitshares} from '../../../infra/blockchain'
import {RatingProperties} from '../../../infra/blockchain/dto/rating'

export class CaseGetRatingFromBitshares {
    
    constructor(private _repository:Repository, private _blockchain:Bitshares){}

    public async invoke({login}:User): Promise<Account[]>{
        try{
            const result = await this._blockchain.receiveRating({login})
            
            return result.total.map(item => ({
                id:"0",
                nickname: item.n,
                games: 1,
                balance: item.v,
                position: item.p,
            }))
        }catch(error){
            console.log(error);
            throw error
        }
    }

}