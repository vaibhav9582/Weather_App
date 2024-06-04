const mongoose = require("mongoose");
const passport = require("passport");

const plm = require("passport-local-mongoose");

mongoose.connect(process.env.MONGO);

const userSchema = mongoose.Schema({
    username : String,
    password : String,
    secret : String 
})

userSchema.plugin(plm);

module.exports = mongoose.model("User", userSchema); 