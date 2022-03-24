import {Router} from 'express';
import {CaseLogin} from '../cases/login'

const router = Router();

router.post('/login',(req,res)=>{

    const data = req.body
    new CaseLogin().invoke(data).then(result => res.json(result))
})


export default router