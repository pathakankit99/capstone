import dbConnect from '../../../helpers/dbConnect'
import User from '../../../models/User'
import Role from '../../../models/Role'
import { validate } from '../../../middlewares/policies'
import nextConnect from 'next-connect'
const handler = nextConnect({
  // Handle any other HTTP method
  onNoMatch(req, res) {
    res.status(405).json({ error: `Method '${req.method}' Not Allowed` })
  },
})

handler.use(validate)
handler.put(async (req, res) => {
  await dbConnect()
  const { body } = req.body

  // console.log(body, "req");
  User.find({ email: body.email, _id: { $not: { $eq: req.user._id } } }).exec(
    (err, emailCheck) => {
      if (err) {
        // console.log(err, 'email error');
        res.status(400)
        res.send(err)
      } else if (emailCheck) {
        if (!emailCheck[0]) {
          User.find({
            username: body.username,
            _id: { $not: { $eq: req.user._id } },
          }).exec((err, usernameCheck) => {
            if (err) {
              res.status(400)
              res.send(err)
            } else if (usernameCheck) {
              if (!usernameCheck[0]) {
                User.find({
                  wallet: body.wallet,
                  _id: { $not: { $eq: req.user._id } },
                }).exec((err, walletCheck) => {
                  if (err) {
                    res.status(400)
                    res.send(err)
                  } else if (walletCheck) {
                    if (!walletCheck[0]) {
                      User.updateOne(
                        { _id: req.user._id },
                        body,
                        (err, user) => {
                          if (err) {
                            console.log(err, 'update user err')
                            res.status(400)
                            res.send(err)
                          }
                          User.findOne({ _id: req.user._id })
                            .populate('role')
                            .exec((err, data) => {
                              if (err) {
                                console.log(err, 'find update user err')
                                res.status(400)
                                res.send(err)
                              }
                              if (data) {
                                delete data.password
                                res.status(200)
                                res.send(data)
                              } else {
                                res.status(400)
                                res.send('User not found !')
                              }
                            })
                        }
                      )
                    } else {
                      res.status(400)
                      res.send({
                        message: 'Account with this wallet already exists.',
                      })
                    }
                  } else {
                    res.status(400)
                    res.send('User not found ![3]')
                  }
                })
              } else {
                res.status(400)
                res.send({
                  message: 'Account with this username already exists.',
                })
              }
            } else {
              res.status(400)
              res.send('User not found ![2]')
            }
          })
        } else {
          res.status(400)
          res.send({ message: 'Account with this email already exists.' })
        }
      } else {
        res.status(400)
        res.send('User not found ! [1]')
      }
    }
  )
})

const createOrFindRole = (role) =>
  new Promise((resolve, reject) => {
    Role.findOne({ name: role }, (err, res) => {
      if (err || !res) {
        return Role.create({ name: role }, (error, val) => {
          if (!error || val) {
            console.log(val, 'VA:')
            return resolve(val)
          } else {
            return reject(error)
          }
        })
      }
      return resolve(res)
    })
  })

export default handler
