const express = require("express");
const app = express();
const port = 3000;
const mongoose = require('mongoose');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
const route = require('./routes/index.route');
const authMiddleware = require('./middlewares/auth.middleware');;

app.use(cookieParser('13jng'))

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

mongoose.connect('mongodb://localhost/airline-booking', { useNewUrlParser: true, useUnifiedTopology: true });

app.set("views", "./views");
app.set('view engine', 'pug')

app.use(express.static("public"));

app.use(authMiddleware);

route(app);

app.listen(port);