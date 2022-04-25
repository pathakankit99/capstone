import dbConnect from '../../../helpers/dbConnect'
import Order from '../../../models/Order'
import nextConnect from 'next-connect'
const Razorpay = require('razorpay')
// const idGenerator = require('mongo-incremental-id-generator')(process.env.MONGODB_URI)
const { validate } = require('../../../middlewares/policies')
const instance = new Razorpay({
  key_id: process.env.RAZORPAY_API,
  key_secret: process.env.RAZORPAY_SECRET,
})
const handler = nextConnect({
  // Handle any other HTTP method
  onNoMatch(req, res) {
    res.status(405).json({ error: `Method '${req.method}' Not Allowed` })
  },
})
handler.use(validate)
handler.post(async (req, res) => {
  // console.log(req,'req')
  await dbConnect()
  const { body, user } = req
  //  console.log(user, 'USER')
  if (user) {
    body.createdBy = user._id
    body.updatedBy = user._id
  }
  // console.log(req.body, 'req body');
  // console.log(body, "BODY");
  body.user = req.user._id
  console.log("Launching IDGenerator");
  Order.countDocuments({}, (err, count) => {
     if (err) {
       res.status(400)
       res.send({ message: 'Parameters are not valid' })
     } else {
       console.log('Creating payParams')
       const payParams = {
         currency: 'INR',
         amount: body.amount * 100,
         receipt: "Eatos"+(count+1),
         payment_capture: '1',
       }
       // console.log("Creating Order ID");
       instance.orders
         .create(payParams)
         .then((data) => {
           console.log('order ID success')
           res.status(200).json({ data, key: process.env.RAZORPAY_API })
         })
         .catch((error) => {
           console.log(error, 'ERR')
           res.send({ error, status: 'failed' })
         })
     }
   })
})

export default handler
