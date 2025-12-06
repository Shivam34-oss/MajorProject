
const express = require("express");
const router = express.Router();
const Listing = require("../models/listing.js");
const wrapAsync = require("../utils/wrapAsync.js")
const {isLoggedIn ,isOwner ,validateListing} = require("../middleware.js");
const listingController = require("../controllers/listing.js");
const multer  = require('multer')
const { storage } = require("../cloudConfig.js");
const upload = multer({ storage: storage });



// index route and post router this is the main route for all listings 

router.route("/")
.get(wrapAsync(listingController.index))
.post(isLoggedIn , validateListing, upload.single('listing[image]'), wrapAsync(listingController.createListing)
 );

// new route submit button on response a submitted new listings
router.get("/new", isLoggedIn, listingController.renderNewForm);


// show route and details route for a single listing
router.route("/:id")
.get( wrapAsync(listingController.showListing))
.put(isLoggedIn, isOwner,  upload.single('listing[image]'),  validateListing, wrapAsync(listingController.updateListing))
.delete( isLoggedIn , isOwner , wrapAsync(listingController.deleteListing));





// edit route 
router.get("/:id/edit",isLoggedIn , isOwner , wrapAsync(listingController.editListing));

module.exports = router;