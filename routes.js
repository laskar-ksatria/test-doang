const express = require('express');
const Router = express.Router();
const Recaptcha = require('recaptcha-v2').Recaptcha;
const nodeCookie = require('node-cookie');

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
            console.log("Captcha success")
            next();
        }else {
            res.status(400).json({message: "Invalid Captcha"})
        }
    })

};

const generateCookie = (token) => {
    let result = token.split("=");
    return result[1];
};

const cookieCheck = (req,res,next) => {

    let token = nodeCookie.get(req, "aloha");
    console.log(token)
    res.status(200).json({token})
    // console.log(req.cookies);
    // let token = req.cookies.aloha
    // if (token) {
    //     res.status(200).json({token: token});
    // }else {
    //     res.status(400).json({message: "Cookie is not valid"})
    // }
}

Router.post('/login', captchaValidate,(req,res,next) => {

    nodeCookie.create(res, "aloha", "owl-king")
    // res.cookie('aloha', "owl-king");
    // // res.setHeader("set-cookie", ["fromserver=1"])
    res.status(200).json({message: "Cookie has been set"});
});

Router.get('/clearcookie', (req,res,next) => {
    res.clearCookie('aloha');
    res.clearCookie('myexchange');
    res.clearCookie('fromserver');
    nodeCookie.clear(res, 'aloha')
    res.status(200).json({message: "Cookie has been clear"})
});

Router.get('/seecookie', cookieCheck)

module.exports = Router;
