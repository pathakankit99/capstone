import dbConnect from '../../../helpers/dbConnect'
import Restaurant from '../../../models/Restaurant'
import convertParams from '../../../utils/convertParams'
import nextConnect from 'next-connect'
import {getUserIftoken, validate} from "../../../middlewares/policies"
const handler = nextConnect({
  // Handle any other HTTP method
  onNoMatch(req, res) {
    res.status(405).json({ error: `Method '${req.method}' Not Allowed` })
  },
})
handler.use(getUserIftoken)
handler.get(async (req, res) => {
    await dbConnect()
    const { body, user } = req;
    const filters = await convertParams(Restaurant, req.query)
    if (req.user) {
        filters.where.user= user._id
    }
    console.log(filters,'filters')
  Restaurant.find(filters.find)
    .where(filters.where)
    .populate('updatedBy')
    .populate('createdBy')
    .sort(filters.sort)
    .skip(filters.start)
    .limit(filters.limit)
    .exec(function (err, restaurants) {
      if (err) {
        return res.status(400).send(err)
        }
        // console.log(restaurants, 'res')
      Restaurant.countDocuments(
        { ...filters.where, ...filters.find },
        (err, count) => {
          if (err) {
            res.status(400)
            res.send({ message: 'Parameters are not valid' })
          }
          const restaurantsList = {
            restaurants,
            restaurantsCount: restaurants.length,
            total: count,
          }

          res.status(200).send(restaurantsList)
        }
      )
    })
})
export default handler
