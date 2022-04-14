
import {Request, Response} from 'express'

import {CaseLogin} from '../cases/login'
import {Bitshares} from '../../infra/blockchain'
import {Repository} from '../repository'
import {JWT} from '../../infra/jwt'
import { db } from '../../db/index'
import {CaseRefreshAccountStatistics} from '../../dashboard/cases/refreshAccountStatistics'

export const login = (req:Request,res:Response)=>{
    const data =  Object.assign(req.body,{username:req.body.login})
    const repository = new Repository(db)
    const blockchain = new Bitshares()
    
    new CaseLogin(repository, blockchain, new JWT(), new CaseRefreshAccountStatistics(repository,blockchain))
        .invoke(data)
        .then(result => res.status(200).json(result))
        .catch(error=>res.sendStatus(401))
}

