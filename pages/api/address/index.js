import dbConnect from '../../../helpers/dbConnect'
import Address from '../../../models/Address'
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
  const filters = await convertParams(Address, req.query)
  if (req.user) {
    filters.where.createdBy = user._id
  }
  console.log(filters, 'filters')
  Address.find(filters.find)
    .where(filters.where)
    .populate('updatedBy')
    .populate('createdBy')
    .sort(filters.sort)
    .skip(filters.start)
    .limit(filters.limit)
    .exec(function (err, addresses) {
      if (err) {
        console.log(err, 'address get err')
        return res.status(400).send(err)
      }
      // console.log(addresses, 'res')
      Address.countDocuments(
        { ...filters.where, ...filters.find },
        (err, count) => {
          if (err) {
            res.status(400)
            res.send({ message: 'Parameters are not valid' })
          }
          const addressList = {
            addresses,
            addressCount: addresses.length,
            total: count,
          }

          res.status(200).send(addressList)
        }
      )
    })
})
export default handler
