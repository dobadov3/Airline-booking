const express = require("express");
const app = express();
const port = 3000;

const homeRoute = require('./routes/home.route');
const authenticationRoute = require('./routes/authentication.route');

app.engine("ejs", require("ejs-locals"));
app.set("views", "./views");
app.set("view engine", "ejs");

app.use(express.static("public"));

app.get("/", function (req, res) {
    res.redirect("/home");
});

app.use('/home', homeRoute);
app.use('/', authenticationRoute);

app.listen(port);
