import dbConnect from '../../../helpers/dbConnect'
import Ticket from '../../../models/Ticket'
import nextConnect from 'next-connect'
import { getUserIftoken, validate} from '../../../middlewares/policies'
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
  console.log(req.body, 'req body');
  if(user){
    body.user = user._id;
  }
  if (body.movie && body.seats && body.theatre && body.time) {
    Ticket.create(body, async (err, ticket) => {
        if (err) {
          
console.log('err3', err)
          return res.status(400).send(err)
        }
        if (ticket) {
          console.log(ticket, "ticket after creation");
          res.status(200)
          res.send(ticket)
        }
      })
  } else {
    res.status(400).send({ message: 'fields are missing' })
  }
})


export default handler
