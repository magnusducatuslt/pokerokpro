import express from 'express'
import routes from './controllers'
import bodyParser from 'body-parser'

const app = express()

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

const PORT = 7777;

app.use('/',routes)

app.listen(7777,()=>{
    console.log('HELLO i am run ',PORT)
})