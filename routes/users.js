const mongoose = require("mongoose");
const passport = require("passport");

const plm = require("passport-local-mongoose");

mongoose.connect("mongodb://127.0.0.1:27017/testinendgame2");

const userSchema = mongoose.Schema({
    username : String,
    password : String,
    secret : String 
})

userSchema.plugin(plm);

module.exports = mongoose.model("User", userSchema); 