var express = require("express");
var router = express.Router({mergeParams: true});
var passport = require("passport");
var User = require("../models/user");
const nodemailer = require('nodemailer');
var api_key = '6a36a05f9593403333259f181737fc44-e51d0a44-03cf5ac7';
var domain = 'sandbox63f67ddecd1b43cebb37c6f8a0b4bd2a.mailgun.org';
var mailgun = require('mailgun-js')({apiKey: api_key, domain: domain});
 



router.get("/", function(req, res) {
    res.render("home");
});

router.get("/login", function(req, res) {
    res.render("login");
});

router.post("/login", passport.authenticate("local",{
        successRedirect: "/",
        failureRedirect: "/login",
        failureFlash: true
    }), function(req, res) {
});

router.get("/register", function(req, res) {
    res.render("register");
});

router.post("/register",function(req,res){
    let email = req.body.email;
    let username = req.body.username;
  var data = {
  from: 'seacomp17@gmail.com',
  to: email,
  subject: 'SignIn',
  text: 'GOOD JOB'
};
 
mailgun.messages().send(data, function (error, body) {
  console.log(body);
});

mailgun.messages().send(data, (error, body) => {
  console.log(error);
});
    var newUser = new User({username: req.body.username});
    User.register(newUser, req.body.password, function(err, user) {
        if(err) {
            req.flash("error", err.message);
            return res.render("register");
        }
        passport.authenticate("local")(req, res, function() {
            req.flash("success", "Welcome to KalaMart, " + user.username);
            res.redirect("/");
        });
    });
})

router.get("/logout", function(req, res) {
    req.logout();
    req.flash("success", "Logged out Successfully!");
    res.redirect("/");
});

router.get("/cart", function(req, res) {
    res.render("cart");
})

router.get("/about", function(req, res) {
    res.render("about");
})

router.get("/checkout", function(req, res) {
    res.render("checkout");
})

router.get("/contact", function(req, res) {
    res.render("contact");
})

module.exports = router;