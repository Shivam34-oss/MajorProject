const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const passportLocalMongoose =  require("passport-local-mongoose");

const userSchema = new Schema({
    email:{
        type : String,
        required : true
    }
})
// why are i am using a automatically username , hashing , salting and hashpassword implement
userSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model('User' ,userSchema) 
