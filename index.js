const express = require("express");
const app = express();
const port = 3000;

app.engine("ejs", require("ejs-locals"));
app.set("views", "./views");
app.set("view engine", "ejs");

app.use(express.static("public"));

app.get("/", function (req, res) {
    res.render("./home/index");
});

app.listen(port);
