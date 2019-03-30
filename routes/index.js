var express = require("express");
var router = express.Router({mergeParams: true});
var passport = require("passport");
const nodemailer = require('nodemailer');
const sendgridTransport = require('nodemailer-sendgrid-transport');

const transporter = nodemailer.createTransport(
  sendgridTransport({
    auth: {
      api_key:
'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'    }
  })
);

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

router.get("/logout", function(req, res) {
    req.logout();
    req.flash("success", "Logged out Successfully!");
    res.redirect("/products");
});

module.exports = router;