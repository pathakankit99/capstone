import dbConnect from '../../../helpers/dbConnect'
import Order from '../../../models/Order'
import convertParams from '../../../utils/convertParams'
import nextConnect from 'next-connect'
import { getUserIftoken, validate } from '../../../middlewares/policies'
const handler = nextConnect({
  // Handle any other HTTP method
  onNoMatch(req, res) {
    res.status(405).json({ error: `Method '${req.method}' Not Allowed` })
  },
})
handler.use(getUserIftoken)
handler.get(async (req, res) => {
  await dbConnect()
  const { body, user } = req
  const filters = await convertParams(Order, req.query)
  if (req.user) {
    filters.where.createdBy = user._id
  }
  console.log(filters, 'filters')
  Order.find(filters.find)
    .where(filters.where)
    .populate('user')
    .sort(filters.sort)
    .skip(filters.start)
    .limit(filters.limit)
    .exec(function (err, orders) {
      if (err) {
        console.log(err, 'order get err')
        return res.status(400).send(err)
      }
      // console.log(orderes, 'res')
      Order.countDocuments(
        { ...filters.where, ...filters.find },
        (err, count) => {
          if (err) {
            res.status(400)
            res.send({ message: 'Parameters are not valid' })
          }
          const orderList = {
            orders,
            orderCount: orders.length,
            total: count,
          }

          res.status(200).send(orderList)
        }
      )
    })
})
export default handler