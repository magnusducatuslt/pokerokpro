
import {Request, Response} from 'express'

import {Bitshares} from '../../infra/blockchain'
import {Repository} from '../../account/repository'
import {db} from '../../db'
import {CaseGetRatingFromBitshares} from '../cases/getRatingFromBitshares'

export const getRatingFromBitshares = (req:Request,res:Response)=>{
    //@ts-ignore
    const data = req.user
    console.log('data',data)
    const repository = new Repository(db)
    const blockchain = new Bitshares()

    new CaseGetRatingFromBitshares(repository,blockchain)
        .invoke(data)
        .then(result => res.status(200).json(result))
        .catch(error=>res.sendStatus(401))
}

