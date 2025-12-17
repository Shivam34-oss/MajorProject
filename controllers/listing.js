const Listing = require("../models/listing.js");
const maptilerClient = require("@maptiler/client");
maptilerClient.config.apiKey = process.env.MAP_TOKEN;

// /listings  OR  /listings?category=beach
module.exports.index = async (req, res) => {
  try {
    const { category ,q } = req.query;
    // console.log("Search Query:",q);
    // console.log("Category Filter:",category);
    // filter object
    const filter = {};
    if (category && category !== "all") {
      filter.category ={$regex:category ,$options:"i"};
    }
      if(q){
        const cleanQuery = q.trim();
        filter.$or = [
          {title:{$regex:cleanQuery, $options:"i"}},
          {location:{$regex:cleanQuery,$options:"i"}},
          {country:{$regex:cleanQuery,$options:"i"}}
        ];
      }
    const allListings = await Listing.find(filter);

    res.render("listings/index.ejs", {
      allListings,
      categories :["trendings","rooms", "beachs", "iconic cities", "cabins", "mountains", "amazing pools", "campings", "farms", "artics",],
      activeCategory: category || "all",
    });
  } catch (err) {
    console.log(err);
    req.flash("error", "Something went wrong while loading listings");
    res.redirect("/");
  }
};


module.exports.renderNewForm = async (req, res) => {
  res.render("listings/new.ejs");
}

module.exports.showListing = async (req, res) => {
  let { id } = req.params;
  //   console.log('SHOW => id:', id, '| url:', req.originalUrl);   // DEBUG
  const listing = await Listing.findById(id).populate({
    path: "reviews", populate: { path: "author", },
  }).populate("owner");
  if (!listing) {
    req.flash("error", "Listing you requested for does not exist");
    res.redirect("/listings")
  }
  console.log(listing);
  res.render("listings/show.ejs", { listing, mapToken: process.env.MAP_TOKEN });
}

module.exports.createListing = async (req, res, next) => {
  let url = req.file.path; // cloudinary url
  let filename = req.file.filename; // cloudinary filename
  let response = await maptilerClient.geocoding.forward(req.body.listing.location);

  const newListing = new Listing(req.body.listing);
  newListing.owner = req.user._id;
  newListing.image = { url, filename }; // set image property to an object with url and filename
  newListing.geometry = response.features[0].geometry;
  let savedListing = await newListing.save();
  console.log(savedListing);
  req.flash("success", "New listing creating")
  res.redirect("/listings");
};

module.exports.editListing = async (req, res) => {
  let { id } = req.params;
  const listing = await Listing.findById(id);
  if (!listing) {
    req.flash("error", "Listing you requested for does not exist");
    res.redirect("/listings")
  }

  let originalImageUrl = listing.image.url;
  originalImageUrl = originalImageUrl.replace('/upload/', '/upload/h_300 ,w_250/'); // Resize to width 300px
  listing.image.url = originalImageUrl;
  res.render("listings/edit.ejs", { listing, originalImageUrl });
};

module.exports.updateListing = async (req, res) => {
  let { id } = req.params;
  // console.log("form data check:",req.body);
  // map working code
 
    let response = await maptilerClient.geocoding.forward(req.body.listing.location);
    req.body.listing.geometry = response.features[0].geometry;
    
  // listing wotking 
  let listing = await Listing.findByIdAndUpdate(id, { ...req.body.listing });

  if (typeof req.file !== 'undefined') {
    let url = req.file.path; // cloudinary url
    let filename = req.file.filename; // cloudinary filename
    listing.image = { url, filename }; // set image property to an object with url and filename
    await listing.save();

  }
  req.flash("success", "Listing Updated!")
  res.redirect(`/listings/${id}`);
};

module.exports.deleteListing = async (req, res) => {
  let { id } = req.params;
  let deletedListing = await Listing.findByIdAndDelete(id);
  console.log(deletedListing);
  req.flash("success", "listing deleted")
  res.redirect("/listings");
};
