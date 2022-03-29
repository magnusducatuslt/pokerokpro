import express from 'express';
import {login,validateToken, getUserInfo, getRatingFromBitshares,refreshAccountStatistics} from './account/controllers'
import dashBoardRoutes from './dashboard'

const app = express()
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

const leaderboard = [
    {
      id: 1,
      nickname: 'vasa',
      games: 6,
      balance: 1000000,
    },
    {
      id: 2,
      nickname: 'vasa2',
      games: 5,
      balance: 4000,
    },
    {
      id: 3,
      nickname: 'vasa3',
      games: 4,
      balance: 3000,
    },
    {
      id: 4,
      nickname: 'vasa4',
      games: 2,
      balance: 2000,
    },
  ]

export {router as routes}