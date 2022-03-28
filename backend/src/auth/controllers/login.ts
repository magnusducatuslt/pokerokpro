
import {Request, Response} from 'express'

import {CaseLogin} from '../cases/login'
import {Bitshares} from '../blockchain'
import {Repository} from '../repository'
import {JWT} from '../../infra/jwt'
import {database} from '../../infra/database'


export const login = (req:Request,res:Response)=>{
    const data = req.body
    new CaseLogin(new Repository(database), new Bitshares(), new JWT())
        .invoke(data)
        .then(result => res.status(200).json(result))
        .catch(error=>res.sendStatus(401))
}

