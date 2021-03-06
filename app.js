const dotenv = require('dotenv');
dotenv.config();
const express = require('express');
const app = express();
const cors = require('cors');
const PORT = process.env.PORT;
const cookieParser = require('cookie-parser');
const session = require('express-session');



app.use(cors({ credentials: true, origin: ["http://localhost:3000", "http://localhost:3001"] }));
app.use(cookieParser());
const { shouldSendSameSiteNone } = require('should-send-same-site-none');
app.use(shouldSendSameSiteNone)
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.get('/', (req, res) => res.status(200).json({message: "We are connected"}))

app.use(require('./routes'));

app.listen(PORT, () => console.log(`Server started on ${PORT}`));