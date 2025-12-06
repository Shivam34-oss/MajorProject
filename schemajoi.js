const Joi = require('joi');

// Validate ONLY the inner object (req.body.listing)
const listingSchema = Joi.object({
  title: Joi.string().min(3).required(),
  description: Joi.string().min(5).required(),

  // Image optional; if provided must be a valid URL
  image: Joi.string().uri().allow('').optional(),

  // NOTE: plural — matches your form name="listing[locations]"
  location: Joi.string().required(),

  country: Joi.string().required(),

  // price should be a NUMBER, not string
  price: Joi.number().min(0).required(),
});

module.exports.listingSchema = listingSchema;

// Review schema (keep as-is unless your form/route differs)
module.exports.reviewSchema = Joi.object({
  review: Joi.object({
    rating: Joi.number().min(1).max(5).required(),
    comment: Joi.string().required(),
  }).required()
});
