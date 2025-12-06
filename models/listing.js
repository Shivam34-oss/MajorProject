const mongoose = require("mongoose");
const review = require("./review.js");
const Schema = mongoose.Schema;

const listingSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },

  description: String,
  image: {
    filename: String,
    url: String,
    
  },
  price: Number,
  location: String,
  country: String,
  reviews:[
    {
      type: Schema.Types.ObjectId,
      ref: "Review"
    }
  ],
  owner : {
    type : Schema.Types.ObjectId,
    ref:"User"
  },
  category: String,
  type: String,
  enum : [ "trendings" , "rooms", "beachs", "iconic cities",  "mountains", "amazing pools" , "campings" , "farms" , "artics" ],
})
// using a random review delete to listing both 
listingSchema.post("findOneAndDelete",async(listing)=>{
  if (listing){
    await review.deleteMany({_id: {$in : listing.reviews}})
    }

  });

const Listing = mongoose.model("Listing", listingSchema);
module.exports = Listing;