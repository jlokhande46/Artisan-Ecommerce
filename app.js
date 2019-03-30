var express = require("express"),
mongoose = require("mongoose"),
passport = require("passport"),
bodyParser = require("body-parser"),
passportLocal = require("passport-local"),
methodOverride = require("method-override"),
flash = require("connect-flash"),
express = require("express"),
app = express();

// Database
mongoose.connect("mongodb://localhost/kala-mart", {useNewUrlParser: true});
mongoose.set('useFindAndModify', false);

// Models
var Product = require("./models/product"),
User = require("./models/user");
// Student = require("./models/student"),
// Comment = require("./models/comment"),
// Feedback = require("./models/feedback"),
// Event = require("./models/event"),
// Inventory = require("./models/event");

// Routes
var productRoutes = require("./routes/products"),
// reviewRoutes = require("./routes/reviews"),
indexRoutes = require("./routes/index");
// feedbackRoutes = require("./routes/feedback"),
// eventRoutes = require("./routes/events"),
// studentRoutes = require("./routes/student"),
// inventoryRoutes = require("./routes/inventory");

// Default Settings
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.use(methodOverride("_method"));
app.use(flash());

// Passport Config
app.use(require("express-session")({
    secret: "abc",
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new passportLocal(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(req, res, next) {
    res.locals.currentUser = req.user;
    res.locals.error = req.flash("error");
    res.locals.success = req.flash("success");
    next();
});

// Routing
app.use(indexRoutes);
// app.use("/products", productRoutes);

app.listen(process.env.PORT, process.env.IP, function() {
    console.log("KalaMart Server is Active!");
});