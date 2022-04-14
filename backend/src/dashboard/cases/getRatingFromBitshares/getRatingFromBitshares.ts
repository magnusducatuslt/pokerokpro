import {Repository} from '../../../account/repository'
import {User, Account} from '../../../entities'
import {Bitshares} from '../../../infra/blockchain'
import {RatingProperties} from '../../../infra/blockchain/dto/rating'


const testData = [
    {
        id:"0",
        nickname: 'petat',
        games: 1,
        balance: 10000,
        position: 1,
    },
    {
        id:"0",
        nickname: 'vasa',
        games: 2,
        balance: 200,
        position: 2,
    }
]

export class CaseGetRatingFromBitshares {
    
    constructor(private _repository:Repository, private _blockchain:Bitshares){}

    public async invoke({username}:User): Promise<Account[]>{
        console.log('-----',username)
        try{
            const result = await this._blockchain.receiveRating({accountName:username})
            //@ts-ignore
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
        // return testData;
    }

}