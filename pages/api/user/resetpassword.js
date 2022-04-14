import dbConnect from '../../../helpers/dbConnect'
import User from '../../../models/User'
const jwt = require('jsonwebtoken')
import bcrypt from 'bcryptjs'
import nextConnect from 'next-connect'
const handler = nextConnect({
  // Handle any other HTTP method
  onNoMatch(req, res) {
    res.status(405).json({ error: `Method '${req.method}' Not Allowed` })
  },
})
handler.put(async (req, res) => {
  await dbConnect()
  var password = req.body.password
  var token = req.body.token
  // console.log(req.body,'body')
  try {
    // console.log(jwt,'jwt')
    var decoded = jwt.verify(token, 'inscape')
    // console.log(decoded,'decoded')
    if (decoded.type === 'user') {
      const salt = await bcrypt.genSalt(10)
      const hashedPassword = await bcrypt.hash(password, salt)
      // console.log(`hashedPassword`, hashedPassword)

      User.updateOne(
        { _id: decoded.data._id },
        { password: hashedPassword, isActive: true, isVerified: true }
      ).exec((err, data) => {
        if (err) {
          res.status(400).send(err)
        }

        console.log(data, 'DATA')
        res.status(200)
        res.json(data)
      })
    }
  } catch (err) {
    console.log(err, 'ERR')
    if (err.name === 'TokenExpiredError') {
      res.status(400)
      res.send('Link Expired.')
    } else {
      res.status(400)
      res.send('Invalid link')
    }
  }
})
export default handler
