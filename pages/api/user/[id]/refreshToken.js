import dbConnect from '../../../../helpers/dbConnect'
import User from '../../../../models/User'
import nextConnect from 'next-connect'
import jwt from 'jsonwebtoken'
const handler = nextConnect({
  // Handle any other HTTP method
  onNoMatch(req, res) {
    res.status(405).json({ error: `Method '${req.method}' Not Allowed` })
  },
})
handler.get(async (req, res) => {
  await dbConnect()
  // console.log(req.query,'params')
  const { id } = req.query
  if (id) {
    User.findOne({ _id: id })
      .populate('role')
      .exec((err, user) => {
        if (err) {
          res.status(400)
          res.send(err)
        }
        if (user) {
          const token = jwt.sign(
            {
              type: user.role.type === 'admin' ? 'admin' : 'user',
              access: ['read', 'write'],
              data: user,
            },
            'eatos',
            {
              expiresIn: 86400,
            }
          )
          delete user.password
          const userDetails = {
            message: 'Token refreshed',
            token_type: 'Bearer',
            token,
            data: user,
          }
          res.status(200)
          res.send(userDetails)
        } else {
          res.status(401)
          res.send('User not found')
        }
      })
  } else {
    res.status(400)
    res.send('Please provide user id')
  }
})

export default handler
