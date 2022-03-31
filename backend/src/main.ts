import express from 'express'
import bodyParser from 'body-parser'
import {routes} from './services'
import {config} from './config/config'

const app = express()

const PORT = config.app.port;

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

app.use(routes)


app.listen(PORT,()=>{
    console.log('HELLO i am run ',PORT)
})