import {Repository} from '../../repository'
import {User} from '../../../entities/User'
import {Bitshares} from '../../blockchain'

export class CaseGetRatingFromBitshares {
    
    constructor(private _repository:Repository, private _blockchain:Bitshares){}

    public async invoke({login}:User){
        try{
            return this._blockchain.receiveRating({login})

            
        }catch(error){
            console.log(error);
            throw error
        }
    }

}