import dbConnect from '../../../helpers/dbConnect'
import Ticket from '../../../models/Ticket'
import convertParams from '../../../utils/convertParams'
import nextConnect from 'next-connect'
import { getUserIftoken} from '../../../middlewares/policies'
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
  console.log(user,'uservalidation')
  const filters = await convertParams(Ticket, req.query)
  if (req.user) {
    filters.where.user = user._id
  }
  console.log(filters, 'filters')
  Ticket.find(filters.find)
    .where(filters.where)
    .sort(filters.sort)
    .skip(filters.start)
    .limit(filters.limit)
    .exec(function (err, tickets) {
      if (err) {
        console.log(err,'eror')
        return res.status(400).send(err)
      }
      console.log(tickets, 'res')
      Ticket.countDocuments(
        { ...filters.where, ...filters.find },
        (err, count) => {
          if (err) {
            res.status(400)
            res.send({ message: 'Parameters are not valid' })
          }
          const ticketList = {
            tickets,
            ticketCount: tickets.length,
            total: count,
          }

          res.status(200).send(ticketList)
        }
      )
    })
})
export default handler
