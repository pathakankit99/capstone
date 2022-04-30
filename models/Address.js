const mongoose = require('mongoose')
const Schema = mongoose.Schema
// create a schema

const addressSchema = new Schema(
  {
    street: { type: String, required: true },
    room: { type: String },
    zipcode: { type: String },
    landmark: { type: String },
    default: { type: Boolean, default: false },
    createdBy: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    updatedBy: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  },
  {
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
  }
)
// the schema is useless so far
// we need to create a model using it
const Address = mongoose.models.Address || mongoose.model('Address', addressSchema)

// make this available to our users in our Node applications
module.exports = Address
