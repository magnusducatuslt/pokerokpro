import {Router} from 'express';
import login from './login'

const  router = Router();


router.use('/api/',login)

export default router