import dbConnect from '../../../helpers/dbConnect'
import Order from '../../../models/Order'
import Ticket from '../../../models/Ticket'
import nextConnect from 'next-connect'
const crypto = require('crypto')
const { validate } = require('../../../middlewares/policies')
const handler = nextConnect({
  // Handle any other HTTP method
  onNoMatch(req, res) {
    res.status(405).json({ error: `Method '${req.method}' Not Allowed` })
  },
})
handler.use(validate)
handler.post(async (req, res) => {
  await dbConnect()
  const { body} = req.body
  //  console.log(req.user, 'USER')
  // console.log(body, 'req body');
  // console.log(body, "BODY");
 
     const user = req.user._id
     const orderraw = body.razorpayOrderId + '|' + body.razorpayPaymentId
     const expectedSignature = crypto
       .createHmac('sha256', process.env.RAZORPAY_SECRET)
       .update(orderraw.toString())
    .digest('hex')
  
  console.log(expectedSignature, 'esign')
  console.log(body.razorpaySignature, 'vs sign')
     if (expectedSignature === body.razorpaySignature) {
       body.status = 'Success'
         const arr = {
            seat: body.seats,
            amount: body.amount / 100,
            status: 'Success',
            order_id: body.razorpayOrderId,
            paymentId: body.razorpayPaymentId,
           user: user,
           createdBy: user,
            updatedBy: user
       }
      //  console.log('creating order db')
       Order.create(arr, (err, order) => {
         if (err) {
           console.log(err, 'ERR')
         } else {
          //  console.log(order,'order')
           res.status(200).send({ message: 'Payment Successful' })
           
           body.cart.map((item) => {
            Ticket.findOne({ _id: item._id }).exec(function (
               err,
               updatedTicket
             ) {
               if (err) {
                 res.status(400)
                 res.send(err)
               }
               updatedTicket.itemsSold = updatedTicket.itemsSold + item.quantity
               Ticket.updateOne(
                 { _id: item._id },
                 updatedTicket,
                 function (err, party) {
                   if (err) {
                     console.log(err,'error in updating Ticket itemsSold ')
                    //  res.status(400)
                    //  res.send(err)
                   }
                   console.log('updated Ticket itemssold')
                  //  res.json({ data: order })
                 }
               )
             })
           })
           

           // console.log("Creating order");
           // res.json({ data: order });
         }
       })
     } else {
       res.status(400).send({ message: 'Payment verification failed' })
     }
})

export default handler