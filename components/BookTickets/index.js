import Form from './Form'
import Nav from '../Nav'
import Seats from './Seats'
import { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
function BookTickets() {
  const [seat, SelectSeat] = useState(new Array(20).fill(1))
  const { user } = useSelector((state) => ({
    user: state.auth_reducer.user,
  }))
  return (
    <div className="min-h-screen bg-brand_blue">
      <Nav />
      {user?.name ? (
        <>
          <Form />
          <Seats seat={seat} SelectSeat={SelectSeat} />
        </>
      ) : (
        <p className='h-screen flex items-center justify-center text-white text-lg font-bold '>Please login to continue</p>
      )}
    </div>
  )
}
export default BookTickets
