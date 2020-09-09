const express = require('express');
const Router = express.Router();
const Recaptcha = require('recaptcha-v2').Recaptcha;

const PUBLIC_KEY = process.env.PUBLIC_KEY;
const SECRET_KEY = process.env.SECRET_KEY;

const captchaValidate = (req,res,next) => {
    var data = {
		remoteip:  req.connection.remoteAddress,
		response:  req.body.captcha,
		secret: SECRET_KEY
    }
    var recaptcha = new Recaptcha(PUBLIC_KEY, SECRET_KEY, data);

    recaptcha.verify((success, err) => {
        if (success) {
            next();
        }else {
            res.status(400).json({message: "Invalid Captcha"})
        }
    })

};


const cookieCheck = (req,res,next) => {
    console.log(req.cookies, "-----------")
    let token = req.cookies.aloha
    res.status(200).json({token})
}

Router.post('/login', captchaValidate,(req,res,next) => {
    res.cookie('aloha', 'owl-king')
    res.status(200).json({message: "Cookie has been set"});
});

Router.get('/clearcookie', (req,res,next) => {
    res.clearCookie('aloha');
    res.status(200).json({message: "Cookie has been clear"})
});

Router.get('/seecookie', cookieCheck)

module.exports = Router;
