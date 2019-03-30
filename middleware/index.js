var Product = require("../models/product");
var Review = require("../models/review");
var middlewareObj = {};

middlewareObj.checkProductOwnership = function(req, res, next) {
    if(req.isAuthenticated()) {
        Product.findById(req.params.id, function(err, foundProduct) {
            if(err) {
                req.flash("error", "Product not found!");
                res.redirect("back");
            } else if(foundProduct.author.id.equals(req.user._id)) {
                next();
            } else {
                req.flash("error", "User does not have the permission to do that!");
                res.redirect("back");
            }
        });
    } else {
        req.flash("error", "User must be logged in to do that!");
        res.redirect("back");
    }
};

middlewareObj.checkReviewOwnership = function(req, res, next) {
    if(req.isAuthenticated()) {
        Review.findById(req.params.id, function(err, foundReview) {
            if(err) {
                req.flash("error", "Product not found!");
                res.redirect("back");
            } else if(foundReview.author.id.equals(req.user._id)) {
                next();
            } else {
                req.flash("error", "User does not have the permission to do that!");
                res.redirect("back");
            }
        });
    } else {
        req.flash("error", "User must be logged in to do that!");
        res.redirect("back");
    }
};

middlewareObj.isLoggedIn = function(req, res, next){
    if(req.isAuthenticated()) {
        return next();
    }
    req.flash("error", "User must be logged in to do that!");
    res.redirect("/login");
};

module.exports = middlewareObj;