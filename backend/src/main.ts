import express from 'express'
import authRoutes from './auth/controllers'
import dashBoardRoutes from './dashboard'
import bodyParser from 'body-parser'
import {JWT} from './infra/jwt'
import {database} from './infra/database'
import {Repository as AuthRepository} from './auth/repository'

const app = express()

const authRepo = new AuthRepository(database)

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())
const PORT = 7777;


app.use('/auth',authRoutes);

//@ts-ignore
app.use('/dashboard',(req,res,next) => {
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
}, dashBoardRoutes);


app.listen(7777,()=>{
    console.log('HELLO i am run ',PORT)
})