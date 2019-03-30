var express = require("express"),
mongoose = require("mongoose"),
passport = require("passport"),
paypal = require("paypal-rest-sdk"),
bodyParser = require("body-parser"),
passportLocal = require("passport-local"),
methodOverride = require("method-override"),
flash = require("connect-flash"),
express = require("express"),
app = express();

app.set("view engine", "ejs");
app.use(express.static(__dirname + "/"));

app.get("/", function(req, res) {
    res.render("home");
})

app.listen(process.env.PORT, process.env.IP, function() {
    console.log("KalaMart Server is Active!");
});