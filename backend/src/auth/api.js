var express = require('express')
var app = express()
var port = 3001

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

const verifyToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];

    console.log('authHeader ', authHeader);

    const token = authHeader && authHeader.split(' ')[1];
    if(token == null) return res.sendStatus(401);
    // jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
    //     if(err) return res.sendStatus(403);
    //     req.email = decoded.email;
    //     next();
    // })

    if (token === '111') return res.sendStatus(401);
    else next();
}


app.get('/', (req, res) => {
  res.send('Hello World!')
})


app.post('/api/login', (req, res) => {
  res.json({
    token: 'blal bla',
  })
})

app.post('/api/logout', (req, res) => {
  res.json({
    ok: 'ok'
  })
})


app.get('/api/user', verifyToken, (req, res) => {
  res.json({
    nickname: 'vasa',
    balance: 1233,
    games: 100,
  })
})


app.get('/api/leaderboard', (req, res) => {
  res.json(leaderboard)
})

app.get('/api/leaderboard/refresh', (req, res) => {
  res.json(leaderboard)
})


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})