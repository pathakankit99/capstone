//@ts-ignore
import React,{ useState } from "react"
import { useSelector, useDispatch } from "react-redux";
import axios from 'axios'
import Snackbar from '@mui/material/Snackbar'
import MuiAlert, { AlertProps } from '@mui/material/Alert'
const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
    props,
    ref
  ) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />
  })

function Form(props:any){
  const dispatch = useDispatch()
    const [success, setSuccess] = useState(false)
    const [error, setError] = useState(false)
    const [message, setMessage] = useState('')
    const [open, setOpen] = useState(false)
    const handleSnackbarOpen = () => setOpen(true)
  const handleSnackbarClose = () => {
    setOpen(false)
  }
    const { seats } = useSelector((state) => ({
      //@ts-ignore
        seats: state.app_reducer.seats,
      }))
      const [movie, setMovie] = useState("")
      const [theatre, setTheatre] = useState("")
      const [timing, setTiming] = useState("")
      const {user, loading } = useSelector((state: any) => ({
    
        loading: state.auth_reducer.loading,
        user: state.auth_reducer.user
    }))
      const razorpay_payment = async (e:any) => {
        e.preventDefault()
        if(seats.length<1)
        {
          handleSnackbarOpen()
            setSuccess(false)
            // console.log(err, "Booking unsuccesssfull");
            setMessage('Select seats')
            setError(true)
            return
        }
        const config = {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
            'Content-Type': 'application/json',
          },
        }
      function loadScript(src:string) {
        return new Promise((resolve) => {
          const script = document.createElement('script')
          script.src = src
          script.onload = () => {
            resolve(true)
          }
          script.onerror = () => {
            resolve(false)
          }
          document.body.appendChild(script)
        })
      }
      dispatch({ type: 'LOADING', payload: true })

      const res = await loadScript(
        'https://checkout.razorpay.com/v1/checkout.js'
      )

      if (!res) {
        setSuccess(false)
        setError(true)
        dispatch({ type: 'LOADING', payload: false })
        // alert('Razorpay SDK failed to load. Are you online?')
        setMessage('Razorpay SDK failed to load. Are you online?')
        handleSnackbarOpen()
        return
      }

      // creating a new order
      const body = {
        seats,
        amount: seats.length * 150,
          status: 'Created',
    
      }

      await axios.post('/api/order/create',body, config)
        .then((res) => {
          // Getting the order details back
            // console.log(res.data,'order create response')
          const options = {
            key: 'rzp_test_eVen98lpACmqrU', // Enter the Key ID generated from the Dashboard
            amount: res.data.data.amount.toString(),
            currency: 'INR',
            name: 'MoviesMasalaMania',
            description: '',
            image: '/assets/bg.jpg',
            order_id: res.data.data.id,
            modal: {
              escape: false,
              ondismiss: function () {
                dispatch({ type: 'LOADING', payload: false })
              },
            },
            handler: async function (response: any) {
            //   console.log(response, 'response from create order')
              const data = {
                orderCreationId: res.data.data.id,
                razorpayPaymentId: response.razorpay_payment_id,
                razorpayOrderId: response.razorpay_order_id,
                razorpaySignature: response.razorpay_signature,
                amount: res.data.data.amount,
                seats,
                currency: 'INR',
              }
              axios
                .post('/api/order/success', { body: data }, config)
                .then((res) => {
                  bookTicket(e);
                  // alert('success')
                  // setSuccess(true)
                  // setError(false)
                  // dispatch({ type: 'LOADING', payload: false })
                  // setMessage('Payment Successfull.')
                  // handleSnackbarOpen()
                  // dispatch({
                  //   type: 'SET_SEATS',
                  //   payload: [],
                  // })
                })
                .catch((err) => {
                  setSuccess(false)
                  setError(true)
                  dispatch({ type: 'LOADING', payload: false })
                  setMessage('Something went wrong')
                  handleSnackbarOpen()
                  console.log(err, 'ERROR')
                  // alert('Something went wrong', 'error');
                })
            },
            prefill: {
              name: user.name,
              email: user.email,
              contact: user.phone,
            },
            notes: {
              address: '',
            },
            theme: {
              color: '#61dafb',
            },
          }

            //@ts-ignore
          const paymentObject = new window.Razorpay(options)
          paymentObject.open()
        })
        .catch((err) => {
          setSuccess(false)
          setError(true)
          dispatch({ type: 'LOADING', payload: false })
          // alert('Razorpay SDK failed to load. Are you online?')
          setMessage('Server error. Are you online?')
          handleSnackbarOpen()
          // alert('Server error. Are you online?')
        })
    }
      function bookTicket(e:any){
          e.preventDefault();
        const body={
            movie,
            theatre,
            time: timing,
            seats
        }
        const config = {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
            'Content-Type': 'application/json',
          },
        }
        axios.post('/api/ticket/book',body, config)
        .then((res) => {
            setMessage("Booking Success")
            console.log(res, "Booking success");
            setSuccess(true)
            setError(false)            
            handleSnackbarOpen()
            setMovie("")
            setTheatre("")
            setTiming("")
            dispatch({
              type: 'SET_SEATS',
              payload: [],
            })
         
          })
          .catch((err) => {
            handleSnackbarOpen()
            setSuccess(false)
            console.log(err, "Booking unsuccesssfull");
            if (err?.data?.message) {
              setMessage(err.data.message)
            } else {
              setMessage('Booking unsuccesssfull')
            }
            setError(true)
          })
    }
    console.log(seats, 'form')
    return(
        <div className=" pt-28 lg:pt-28 flex justify-center">
            <form className="bg-brand_blue_light py-10 w-full md:w-6/12 lg:w-8/12  px-10    rounded-xl ">
               <div className="flex ">
                   <p className="w-4/12 text-xl text-white pr-6 font-semibold ">
                       Movie:
                   </p>
                   <select value={movie} onChange={(e)=>setMovie(e.target.value)} className="w-8/12 rounded-lg" required>
                        <option disabled selected value="">Select Movie</option>
                        <option value="kgf">K.G.F chapter 2</option>
                        <option value="attack">Attack</option>
                        <option value="rrr">RRR</option>
                        <option value="kashmir">The Kashmir Files</option>
                    </select>    
               </div>
               <div className="flex py-4 ">
                   <p className="w-4/12 text-xl text-white pr-6 font-semibold ">
                       Threatre:
                   </p>
                   <select value={theatre} onChange={(e)=>setTheatre(e.target.value)} className="w-8/12 rounded-lg" required>
                        <option disabled selected value="">Select Threatre</option>
                        <option value="cura-mall">Cura Mall</option>
                        <option value="carnival-cinemas">Carnival Cinemas</option>
                        <option value="inox">Inox</option>
                        <option value="pvr">PVR</option>
                    </select>    
               </div>
               <div className="flex ">
                   <p className="w-4/12 text-xl text-white pr-6 font-semibold ">
                      Show Timing:
                   </p>
                   <select value={timing} onChange={(e)=>setTiming(e.target.value)} className="w-8/12 rounded-lg"  required>
                        <option disabled selected value="">Select Show Time</option>
                        <option value="10:00 AM">10 AM</option>
                        <option value="12:30 PM">12:30 PM</option>
                        <option value="05:00 PM">05:00 PM</option>
                        <option value="08:00 PM">08:00 PM</option>
                    </select>    
               </div>
               <div className="flex py-4 ">
                   <p className="w-4/12 text-xl text-white  font-semibold ">
                       Number of Tickets: 
                   </p>
                   <p className="w-8/12 text-xl text-white  font-semibold">
                   {seats.length}
                   </p>
               </div>
               <div className="flex py-4 ">
                   <p className="w-4/12 text-xl text-white pr-6 font-semibold ">
                       Total Cost: 
                   </p>
                   <p className="w-8/12 text-xl text-white  font-semibold">
                   ₹{" "}{seats.length*150}
                   </p>
               </div>
               <div className="form-group flex justify-center">
                    <button onClick={(e)=>razorpay_payment(e)} className=" transition ease-in-out delay-150 bg-blue-800 hover:-translate-y-1 hover:scale-110 hover:bg-brand_blue duration-300   font-semibold text-white px-8 py-2 rounded-lg" >
                        Book Tickets
                    </button>
                </div>
            </form>
            <Snackbar
          open={open}
          autoHideDuration={6000}
          onClose={handleSnackbarClose}
        >
          <Alert
            onClose={handleSnackbarClose}
            severity={success ? 'success' : 'error'}
            sx={{ width: '100%' }}
          >
            {message}
          </Alert>
        </Snackbar>
        </div>
    )
}

export default Form