import {Repository} from '../../repository'
import {User} from '../../../entities/User'

export class CaseUserInfo {
    
    constructor(private _repository:Repository){}

    public async invoke({login}:User){
        try{
            const user = await this._repository.findUser(login);

            return user
        }catch(error){
            console.log(error);
            throw error
        }
    }

}