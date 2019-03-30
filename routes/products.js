var express = require("express");
var router = express.Router({mergeParams: true});
var Fundraiser = require("../models/product");
var middleware = require("../middleware");

router.get("/", function(req, res) {
    res.render("index")
})