import dbConnect from '../../../helpers/dbConnect'
import Dish from '../../../models/Dish'
import nextConnect from 'next-connect'
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
  const { body, user } = req
  //  console.log(user, 'USER')
  if (user) {
    body.createdBy = user._id
    body.updatedBy = user._id
  }
  // console.log(req.body, 'req body');
  if (body.name && body.type && body.img && body.restaurant) {
    Dish.create(body, async (err, result) => {
      if (err) {
        console.log('err3', err)
        return res.status(400).send(err)
      }
      if (result) {
        // console.log(user, "after creation");
        res.status(200)
        res.send(result)
      }
    })
  } else {
    res.status(400).send({ message: 'Fill all fields' })
  }
})

export default handler
