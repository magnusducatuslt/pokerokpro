
import {Request, Response} from 'express'

import {Repository} from '../repository'
import {database} from '../../infra/database'
import {CaseUserInfo} from '../cases/getUserInfo'
import {Bitshares} from '../../infra/blockchain'

export const getUserInfo = (req:Request,res:Response)=>{
    //@ts-ignore
    const data = req.user
    const repository = new Repository(database)
    const blockchain = new Bitshares()

    new CaseUserInfo(repository,blockchain)
        .invoke(data)
        .then(result => res.status(200).json(result))
        .catch(error=>res.sendStatus(401))
}

