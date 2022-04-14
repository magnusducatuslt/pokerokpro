import {Request} from 'express'
import jwt from 'jsonwebtoken'
import {UserInstance} from "db/models/User"

const TOKEN_SECRET = `1a2b-3c4d-@5e6f-7g8h-asdasd-asdasd-s`
const EXPIRES_IN = '1800s'


export class JWT {
    public parseToken(req:Request){
        const authHeader = req.headers['authorization'];
        /**
         * pop only token skip authorization scheme Bearer etc.
         * https://security.stackexchange.com/questions/108662/why-is-bearer-required-before-the-token-in-authorization-header-in-a-http-re
         */
        return authHeader && authHeader.split(' ')[1]
    }

    public getEntityFromToken(token:string): Promise<UserInstance>{
        /**
         * can throw error "JsonWebTokenError: jwt malformed"
         * if arguments.length signed in JWT token more than 1
         */
        return new Promise((resolve, reject)=>{
            jwt.verify(token, TOKEN_SECRET, (error: any, user: any) => {
                console.log(error, user)
                if(error){
                   reject(error)
                }
                resolve(user)
              })
        })
    }

    public getTokenFromData(data:UserInstance){
        return jwt.sign({ username:data.username }, TOKEN_SECRET,{ expiresIn: EXPIRES_IN })
    }
}
