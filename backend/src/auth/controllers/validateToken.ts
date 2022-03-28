import {Request, Response, NextFunction} from 'express'
import {JWT} from '../../infra/jwt'
import {database} from '../../infra/database'
import {Repository as AuthRepository} from '../repository'


const authRepo = new AuthRepository(database)

//@ts-ignore
export const validateToken = (req:Request,res:Response,next:NextFunction) => {
    const jwt = new JWT();
    const token = jwt.parseToken(req)

    if(!token){
        return res.sendStatus(401)
    }

    jwt.getEntityFromToken(token).then(entity => {
        authRepo.findUser(entity.login).then(user=>{
            if(!user){
                return res.sendStatus(403)
            }
            //@ts-ignore
            req.user = user
            return next()
            
        }).catch(userDoesntExist => res.sendStatus(403))
        
    }).catch(tokenDoesntExistError => res.sendStatus(401))
}