var passport = require("passport");
var LocalStrategy = require("passport-local").Strategy; //used to store authntication strategy we used locally
var User = require("./models/user");

exports.local = passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser()); //provide whatever required for support of sessions
