// scripts/checkListings.js
require('dotenv').config();
const mongoose = require('mongoose');
const path = require('path');

// require model - path relative to this file (scripts is one level under project root)
const Listing = require(path.join(__dirname, '..', 'models', 'listing'));

async function run(){
  const dbUrl = process.env.ATLASDB_URL || process.env.MONGO_URL || process.env.ATLAS_URI;
  if(!dbUrl){
    console.error('ERROR: ATLASDB_URL / MONGO_URL not found in environment.');
    console.error('Make sure your .env has ATLASDB_URL or MONGO_URL, or that you have those env vars set.');
    process.exit(1);
  }
  await mongoose.connect(dbUrl, { useNewUrlParser: true, useUnifiedTopology: true });
  const docs = await Listing.find({}).limit(5).lean();
  console.log('Found', docs.length, 'docs');
  docs.forEach((d, i) => {
    console.log('--- doc', i, 'id:', d._id);
    console.log(' title:', d.title || d.name || '(no title)');
    console.log(' image field:', JSON.stringify(d.image, null, 2));
    // if images array exists (older code), show it too
    if (d.images) {
      console.log(' images array (first):', JSON.stringify(d.images[0], null, 2));
    }
  });
  await mongoose.disconnect();
  process.exit(0);
}

run().catch(e => {
  console.error('Script error:', e);
  process.exit(1);
});
