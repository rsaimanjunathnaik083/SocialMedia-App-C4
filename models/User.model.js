const mongoose = require("mongoose");

// userSchema
const userSchema=mongoose.Schema({
    name: String,
    email: String,
    gender: String,
    password: String
},{
    versionKey:false
});

const UserModel = mongoose.model("user", userSchema);

module.exports = { UserModel };