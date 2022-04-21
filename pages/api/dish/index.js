import dbConnect from '../../../helpers/dbConnect'
import Dish from '../../../models/Dish'
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
  const filters = await convertParams(Dish, req.query)
  if (req.user) {
    filters.where.user = user._id
  }
  console.log(filters, 'filters')
  Dish.find(filters.find)
    .where(filters.where)
    .populate('updatedBy')
    .populate('createdBy')
    .sort(filters.sort)
    .skip(filters.start)
    .limit(filters.limit)
    .exec(function (err, dishes) {
      if (err) {
        return res.status(400).send(err)
      }
      // console.log(dishes, 'res')
      Dish.countDocuments(
        { ...filters.where, ...filters.find },
        (err, count) => {
          if (err) {
            res.status(400)
            res.send({ message: 'Parameters are not valid' })
          }
          const dishList = {
            dishes,
            dishCount: dishes.length,
            total: count,
          }

          res.status(200).send(dishList)
        }
      )
    })
})
export default handler
