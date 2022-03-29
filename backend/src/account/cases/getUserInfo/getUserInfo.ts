import {Repository} from '../../repository'
import {User,Account} from '../../../entities'

export class CaseUserInfo {
    
    constructor(private _repository:Repository){}

    public async invoke({login}:User) : Promise<Account>{
        try{
            const account = await this._repository.getAccountInfo(login);

            return account
        }catch(error){
            console.log(error);
            throw error
        }
    }

}