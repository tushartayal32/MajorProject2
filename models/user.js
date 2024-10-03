const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const passportlocalMongoose = require("passport-local-mongoose");

const userSchema = new Schema({
    email: {
        type: String,
        required: true,
    },
});

userSchema.plugin(passportlocalMongoose);//it will automatically store the username and password in hashed and salt value also added
module.exports = mongoose.model("User", userSchema);