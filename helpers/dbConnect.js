import mongoose from 'mongoose'
require('../models/User')
require('../models/Role')
require('../models/Ticket')
require('../models/Order')
const MONGODB_URI = process.env.MONGODB_URI
const LOCAL_URI = process.env.LOCAL_URI
console.log(MONGODB_URI, ' db');
if (!MONGODB_URI) {
  throw new Error(
    'Please define the MONGODB_URI environment variable inside .env.local'
  )
}

/**
 * Global is used here to maintain a cached connection across hot reloads
 * in development. This prevents connections growing exponentially
 * during API Route usage.
 */
let cached = global.mongoose

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null }
}

async function dbConnect() {
  if (cached.conn) {
    return cached.conn
  }

  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }

   

    cached.promise = mongoose.connect(MONGODB_URI, opts).then((mongoose) => {
      return mongoose
    })
  }
  cached.conn = await cached.promise
  if (cached.conn) console.log('connected')
  else console.log('not connected')
  return cached.conn
}

export default dbConnect
