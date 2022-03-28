import express from 'express'
import bodyParser from 'body-parser'
import {routes} from './services'
const app = express()



// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

app.use(routes)

const PORT = 7777;


app.listen(PORT,()=>{
    console.log('HELLO i am run ',PORT)
})