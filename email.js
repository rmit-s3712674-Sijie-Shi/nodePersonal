const email = require('express').Router()
const nodemailer = require('nodemailer')
email.post('/', (request, response) => {
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

module.exports = email