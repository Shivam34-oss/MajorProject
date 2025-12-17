const mongoose = require("mongoose");
const review = require("./review.js");
const { required } = require("joi");
const { coordinates } = require("@maptiler/client");
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
  geometry:{
    type:{
      type:String,
      enum :['Point'],
      required:true
    },
    coordinates:{
      type:[Number],
      required:true
    }
  },
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
  enum : [ "trending" , "rooms", "beaches", "iconic cities",  "mountains", "amazing pools" , "camping" , "farms" , "arctic" ],
})
// using a random review delete to listing both 
listingSchema.post("findOneAndDelete",async(listing)=>{
  if (listing){
    await review.deleteMany({_id: {$in : listing.reviews}})
    }

  });

const Listing = mongoose.model("Listing", listingSchema);
module.exports = Listing;