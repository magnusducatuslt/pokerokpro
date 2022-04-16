
import {Request, Response} from 'express'

import {Repository} from '../repository'
import {db} from '../../db'
import {CaseAccountInfo} from '../cases/getAccountInfo'
import {Bitshares} from '../../infra/blockchain'

export const getUserInfo = (req:Request,res:Response)=>{
    //@ts-ignore
    const data = req.user
    const repository = new Repository(db)
    const blockchain = new Bitshares()

    new CaseAccountInfo(repository,blockchain)
        .invoke(data)
        .then(result => res.status(200).json(result))
        .catch(error=>res.sendStatus(401))
}

