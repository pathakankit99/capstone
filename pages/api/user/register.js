import dbConnect from '../../../helpers/dbConnect'
import User from '../../../models/User'
import Role from '../../../models/Role'
import nextConnect from 'next-connect'
const handler = nextConnect({
  // Handle any other HTTP method
  onNoMatch(req, res) {
    res.status(405).json({ error: `Method '${req.method}' Not Allowed` })
  },
})
handler.post(async (req, res) => {
  await dbConnect()
  const { body } = req
  // console.log(req.body, 'req body');
  if (body.role && body.password) {
    createOrFindRole(body.role).then((role) => {
      if (role && role._id) {
        body.role = role._id
        User.findOne({ email: body.email }, (err, user) => {
          if (err) {
            
        console.log('err', err)
            return res.status(400).send(err)
          }
          if (user) {
            return res
              .status(400)
              .send({ message: 'Account already exits with this email.' })
          } else {
            User.findOne({ username: body.username }, (err, usernameCheck) => {
              if (err) {
                
        console.log('err2', err)
                return res.status(400).send(err)
              }
              if (usernameCheck) {
                return res.status(400).send({
                  message: 'Account already exits with this username.',
                })
              } else {
                // console.log(body, 'before creation')
                User.create(body, async (err, user) => {
                  if (err) {
                    
        console.log('err3', err)
                    return res.status(400).send(err)
                  }
                  if (user) {
                    // console.log(user, "after creation");
                    res.status(200)
                    res.send(user)
                  }
                })
              }
            })
          }
        })
      }
    })
  } else {
    res.status(400).send({ message: 'User role is missing' })
  }
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
