import dbConnect from '../../../helpers/dbConnect'
import User from '../../../models/User'
import DeviceToken from '../../../models/Devicetokens'
import jwt from 'jsonwebtoken'
import nextConnect from 'next-connect'
const handler = nextConnect({
  // Handle any other HTTP method
  onNoMatch(req, res) {
    res.status(405).json({ error: `Method '${req.method}' Not Allowed` })
  },
})
handler.post(async (req, res) => {
  await dbConnect()
  const q = {
    $or: [
      {
        email: req.body.identifier,
      },
      {
        username: req.body.identifier,
      },
    ],
  }

  User.findOne(q)
    .populate('role')
    .exec((err, user) => {
      if (err) {
        console.log(err, 'err')
        res.send(err)
      }
      if (user) {
        // console.log(user.isActive, "user");
        if (user) {
          user.comparePassword(req.body.password, (err, isMatch) => {
            if (isMatch) {
              if (req.body.device_token) {
                checkOrCreateDeviceToken(req.body.device_token, user._id)
                  .then((data) => console.log(data, 'DATA'))
                  .catch(() =>
                    res
                      .status(400)
                      .send({ msg: 'Unable to create device token' })
                  )
              }
              const token = jwt.sign(
                {
                  type: user.role.type === 'admin' ? 'admin' : 'user',
                  access: ['read', 'write'],
                  data: user,
                },
                'inscape',
                {
                  expiresIn: 86400,
                }
              )
              delete user.password
              const userDetails = {
                message: 'Login successful !',
                token_type: 'Bearer',
                token,
                data: user,
              }
              res.status(200)
              res.send(userDetails)
            } else {
              res.status(400)
              res.json({ message: 'Incorrect email or password.' })
            }
          })
        } else {
          res.status(400)
          res.json({ message: 'Your account is disabled!' })
        }
      } else {
        res.status(400)
        res.json({ message: 'Incorrect email or password.' })
      }
    })
})
const checkOrCreateDeviceToken = (token, user) =>
  new Promise((resolve, reject) =>
    DeviceToken.findOne({ user }, (err, device) => {
      if (err) {
        reject(err)
      }
      if (device) {
        DeviceToken.updateOne(
          { _id: device._id },
          { token, user },
          (error, response) => {
            if (error) {
              reject(error)
            }
            if (response) {
              resolve(device)
            }
          }
        )
      } else {
        DeviceToken.create({ token, user }, (error, newdevice) => {
          if (error) {
            reject(error)
          }
          if (newdevice) {
            resolve(newdevice)
          }
        })
      }
    })
  )
export default handler
