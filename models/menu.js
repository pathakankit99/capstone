const mongoose = require('mongoose')
const Schema = mongoose.Schema
// create a schema

const menusSchema = new Schema(
  {
    name: { type: String, required: true },
    description: { type: String },
    category: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Category',
        valueType: 'ObjectId',
      },
        ],
        cover: { type: Object, required: true },
    price: [{ type: Object, required: true }],
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
const Menu = mongoose.model('Menu', menusSchema)

// make this available to our users in our Node applications
module.exports = Menu
