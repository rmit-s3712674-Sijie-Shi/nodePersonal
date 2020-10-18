const express = require('express')
const app = express()
const cors = require('cors')
const bodyparser = require('body-parser')
const emailRouter = require('./email')

app.use(bodyparser.json())
app.use(cors())
const requestLogger = (request, response, next) => {
    console.log('Method:', request.method)
    console.log('Path:  ', request.path)
    console.log('Body:  ', request.body)
    console.log('Header: ', request.get('Authorization'))
    console.log('---')
    next()
  }
  app.use(requestLogger)
app.use(express.static('build'))
app.use('/email', emailRouter)
const PORT = process.env.PORT||3005
app.listen(PORT)
console.log(`Server running on port ${PORT}`)