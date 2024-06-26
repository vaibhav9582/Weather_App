var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");
const expressSession = require("express-session");
const passport = require("passport");
const dotenv = require('dotenv');


var app = express();

const flash = require("connect-flash");

const mongoose = require('mongoose');

// main().catch(err => console.log(err));

// async function main() {
//   await mongoose.connect('mongodb://127.0.0.1:27017/testinendgame2');
// }

// mongoose.connect(MONGOURL).then(()=>{
//   console.log("nicee");
// }).catch(()=>{
//   console.log("nhi ho payega ..");
// })

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs"); // iske baad

app.use(
  expressSession({
    resave: false,
    saveUninitialized: false,
    secret: "Vaibhav2003 Vaibhav2003",
  })
);

app.use(flash());

app.use((req, res, next) => {
  res.locals.success = req.flash("success");
  next();
});

app.use(passport.initialize());
app.use(passport.session());
passport.serializeUser(usersRouter.serializeUser());
passport.deserializeUser(usersRouter.deserializeUser());

app.use(logger("dev")); //isse phle
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/users", usersRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

app.listen(() => {
  console.log("Server is running...");
});

module.exports = app;
