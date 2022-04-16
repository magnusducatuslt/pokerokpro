import {Request, Response, NextFunction} from 'express'
import {JWT} from '../../infra/jwt'
import {db} from '../../db'
import {Repository as AuthRepository} from '../repository'


const authRepo = new AuthRepository(db)

//@ts-ignore
export const validateToken = (req:Request,res:Response,next:NextFunction) => {
    const jwt = new JWT();
    const token = jwt.parseToken(req)

    if(!token){
        return res.sendStatus(401)
    }
    jwt.getEntityFromToken(token).then(entity => {
        authRepo.findUser({username:entity.username}).then(user=>{
            if(!user){
                return res.sendStatus(403)
            }
            console.log('----',user)
            //@ts-ignore
            req.user = user
            console.log('going next',user)
            return next()
            
        }).catch(userDoesntExist => res.sendStatus(403))
        
    }).catch(tokenDoesntExistError => res.sendStatus(401))
}