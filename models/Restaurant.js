const mongoose = require('mongoose')
const Schema = mongoose.Schema
// create a schema

const restaurantSchema = new Schema(
  {
    name: { type: String, required: true },
    description: { type: String },
    tag: { type: String },
    type: {
      type: String,
      trim: true,
      valueType: 'String',
      enum: ['veg', 'mixed'],
      required: true,
    },
    img: { type: Object, required: true },
    city: { type: String, required: true },
    rating: { type: Number, default: 0 },
    totalReviews: { type: Number, default: 0 },
    totalRatings: { type: Number, default: 0 },
    createdBy: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    updatedBy: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  },
  {
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
  }
)
// the schema is useless so far
// we need to create a model using it
const Restaurant = mongoose.models.Restaurant ||mongoose.model('Restaurant', restaurantSchema)

// make this available to our users in our Node applications
module.exports = Restaurant
