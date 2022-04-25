const mongoose = require('mongoose')
const Schema = mongoose.Schema
// create a schema

const dishSchema = new Schema(
  {
    name: { type: String, required: true },
    description: { type: String },
    tag: { type: String },
    type: {
      type: String,
      trim: true,
      valueType: 'String',
      enum: ['veg', 'non-veg'],
      required: true,
    },
    homemade: {
      type: Boolean,
      default: false,
    },
    category: {
      type: String,
      trim: true,
      valueType: 'String',
      enum: [
        'drinks',
        'main-course',
        'sweets',
        'combos',
        'snacks',
        'cakes',
        'thali',
      ],
      default: 'main-course',
      required: true,
    },
    img: { type: Object, required: true },
    price: { type: Number, required: true },
    rating: { type: Number, default: 0 },
    itemsSold: { type: Number, default: 0 },
    totalReviews: { type: Number, default: 0 },
    totalRatings: { type: Number, default: 0 },
    restaurant: {
      type: Schema.Types.ObjectId,
      ref: 'Restaurant',
      required: true,
    },
    createdBy: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    updatedBy: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  },
  {
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
  }
)
// the schema is useless so far
// we need to create a model using it
const Dish = mongoose.models.Dish || mongoose.model('Dish', dishSchema)

// make this available to our users in our Node applications
module.exports = Dish
