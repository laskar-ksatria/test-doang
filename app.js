const dotenv = require('dotenv');
dotenv.config();

const express = require('express');
const app = express();
const cors = require('cors');
const cookieParser = require('cookie-parser');
const PORT = process.env.PORT;
const http = require('http');
const server = http.createServer(app);

app.use(cors({ credentials: true, origin: ['http://localhost:3000', 'http://localhost:3001'] }));
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({extended: false}));

app.get('/gettoken', (req,res,next) => {
    console.log('Masuk token');
    let token = "test-token";
    res.cookie('testcookie', token, {secure: false});
    res.status(200).json({message: "Cookie has been set"})
});

app.get("/checktoken", (req,res,next) => {
    let token = req.cookies.testcookie;
    console.log(token, "TOken --------------");
    if (token) {
        res.status(200).json({message: "Cookie isValid"})
    }else {
        res.status(500).json({message: "Cookie not valid"});
    }
});

app.get('/cleartoken',  (req,res,next) => {
    res.clearCookie('testcookie');
    res.status(200).json({message: "Cookie has been clear"})
})

server.listen(PORT, () => console.log(`Server started on ${PORT}`));