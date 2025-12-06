require("dotenv").config();
const mongoose = require("mongoose");
const initData =require("./data.js");
const Listing = require("../models/listing.js");
const User = require("../models/user.js");

const dbUrl = process.env.ATLASDB_URL;
// console.log("loded DB URL:",dbUrl);
main().then(()=>{
    console.log("conected to DB");

}).catch((err)=>{
    console.log(err);
})
async function main() {
    await mongoose.connect(dbUrl);
}
const initDB = async()=>{
    await Listing.deleteMany({});
    initData.data = initData.data.map((obj) =>({...obj, owner: '6914002c23e50fe547937481'}));
    await Listing.insertMany(initData.data);
    console.log("data was initialized");

    // const s = await  User.find({});
    // console.log("lisitng " ,s)

};


initDB();
