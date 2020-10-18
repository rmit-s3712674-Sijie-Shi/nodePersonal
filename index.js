const express = require('express')
const nodemailer = require('nodemailer')
const app = express()
const cors = require('cors')
const bodyparser = require('body-parser')

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
app.post('/email', (request, response) => {
    const body = request.body
    const transporter = nodemailer.createTransport({
        host: 'hwsmtp.exmail.qq.com',
        port: 465,
        secure: true,
        auth: {
            user: 'service@rikus.rocks',
            pass: 'cBiqX9cvkddLxS7C'
        }
    })
    let mailObj = {
        from: '"service" <service@rikus.rocks>',
        to: 'rikusrocks@gmail.com',
        subject: "Webpage contect",
        text: "Person called " + body.name + " sent you a message " + body.message + ", with email: " + body.email
        //text:"123"
    }
    transporter.sendMail(mailObj, async (err, data) => {
        if (err) {
            console.log(err)
        } else {
            response.json('Email has been sent')
            console.log('Email has been sent')
        }
    })
})
const PORT = process.env.PORT||3005
app.listen(PORT)
console.log(`Server running on port ${PORT}`)