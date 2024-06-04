var express = require("express");
const passport = require("passport");
var router = express.Router();
const usermodel = require("./users");



const localStrategy = require("passport-local");
passport.use(new localStrategy(usermodel.authenticate()));

/* GET home page. */
router.get("/", function (req, res) {
  res.render("index");
});

router.get("/profile", isLoggedIn, function (req, res) {
  res.render("profile");
});

router.get("/logins", function (req, res) { 
  res.render("logins" , {error : req.flash('error')});
});


router.post("/register", function (req, res) {
  const userdata = new usermodel({
    username: req.body.username,
    secret: req.body.secret,
  });

  usermodel
    .register(userdata, req.body.password)
    .then(function (registereduser) {
      passport.authenticate("local")(req, res, function () {
        res.redirect("/profile");
      });
    });
});

router.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: "/profile",
    failureRedirect: "/logins",
    failureFlash : true
  }),
  function (req, res) {}
);

router.get("/logout", function (req, res, next) {
  req.logOut(function (err) {
    if (err) return next(err);
    res.redirect("/");
  });
});

function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect("/");
}
module.exports = router;
