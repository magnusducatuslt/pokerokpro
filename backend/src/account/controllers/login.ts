
import {Request, Response} from 'express'

import {CaseLogin} from '../cases/login'
import {Bitshares} from '../../infra/blockchain'
import {Repository} from '../repository'
import {JWT} from '../../infra/jwt'
import {database} from '../../infra/database'
import {CaseRefreshAccountStatistics} from '../../dashboard/cases/refreshAccountStatistics'

export const login = (req:Request,res:Response)=>{
    const data = req.body
    const repository = new Repository(database)
    const blockchain = new Bitshares()

    new CaseLogin(repository, blockchain, new JWT(), new CaseRefreshAccountStatistics(repository,blockchain))
        .invoke(data)
        .then(result => res.status(200).json(result))
        .catch(error=>res.sendStatus(401))
}

