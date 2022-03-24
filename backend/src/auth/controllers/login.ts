import {Router} from 'express';
import {CaseLogin} from '../cases/login'
import {Bitshares} from '../blockchain'
import {Repository} from '../repository'

const router = Router();

const db = new Map();
router.post('/login',(req,res)=>{

    const data = req.body
    new CaseLogin(new Repository(db), new Bitshares()).invoke(data).then(result => res.json(result))
})


export default router