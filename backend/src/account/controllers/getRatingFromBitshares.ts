
import {Request, Response} from 'express'

import {Bitshares} from '../blockchain'
import {Repository} from '../repository'
import {database} from '../../infra/database'
import {CaseGetRatingFromBitshares} from '../cases/getRatingFromBitshares'

export const getRatingFromBitshares = (req:Request,res:Response)=>{
    //@ts-ignore
    const data = req.user
    const repository = new Repository(database)
    const blockchain = new Bitshares()

    new CaseGetRatingFromBitshares(repository,blockchain)
        .invoke(data)
        .then(result => res.status(200).json(result))
        .catch(error=>res.sendStatus(401))
}

