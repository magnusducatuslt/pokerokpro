import express from 'express';
import {login,validateToken, getUserInfo, getRatingFromBitshares} from './account/controllers'
import {refreshAccountStatistics} from './dashboard/controllers'
import dashBoardRoutes from './dashboard'

const routes = express.Router()

routes.use('/login',login)

routes.post('/logout', (req, res) => {
    res.json({
      ok: 'ok'
    })
})

routes.get('/user',validateToken, getUserInfo)
  
  routes.get('/leaderboard',validateToken, getRatingFromBitshares)
  
  routes.get('/leaderboard/refresh',validateToken, refreshAccountStatistics)

const router = express.Router();
router.use('/api',routes)

export {router as routes}