var mongoose = require('mongoose')
var Schema = mongoose.Schema
// create a schema
var ticketSchema = new Schema(
  {
    movie: { type: String, required: true },
    theatre: { type: String, required: true },
    time: { type: String, required: true },
    seats: { type: Array, required: true },
    user: { type: Schema.Types.ObjectId, ref: 'User'},
  },
  {
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
  }
)
// the schema is useless so far
// we need to create a model using it
var Ticket =mongoose.models.Ticket|| mongoose.model('Ticket', ticketSchema)

// make this available to our users in our Node applications
module.exports = Ticket
