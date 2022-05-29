import React, {useState, useEffect} from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { MdGpsFixed } from 'react-icons/md'
import {BsTrashFill} from 'react-icons/bs'
import { HiLocationMarker } from 'react-icons/hi'
import {IoMdRestaurant} from "react-icons/io"
import axios from 'axios'
import CircularProgress from '@mui/material/CircularProgress'
import { AiOutlineMinus, AiOutlinePlus } from 'react-icons/ai'

import Snackbar from '@mui/material/Snackbar'
import MuiAlert, { AlertProps } from '@mui/material/Alert'
const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />
})
function index() {
  const [snackbar, setSnackbar] = React.useState(false)
  
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState(false)
  const [message, setMessage] = useState('')

  
  const handleSnackbarOpen = () => {
    setSnackbar(true)
  }

  const handleSnackbarClose = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === 'clickaway') {
      return
    }

    setSnackbar(false)
  }


    const dispatch = useDispatch()
     const { cart, state, user, loading } = useSelector((state: any) => ({
         cart: state.app_reducer.cart,
         state: state.app_reducer,
         loading: state.auth_reducer.loading,
         user: state.auth_reducer.user
     }))
  const [total, setTotal] = useState(0);
  const [gst, setGST] = useState(0)
    const removeFromCart = (item: any) => {
    const indexOf = cart?.findIndex((e: any) => e._id == item._id)
    // console.log(indexOf,'index')
    cart.splice(indexOf, 1)
    // console.log(cart, 'cart after removing index')
    dispatch({
        type: 'ADD_TO_CART',
        payload: cart,
    })
    }
    useEffect(() => {
        var temp = 0;
        cart?.map((item:any) => {
          temp = temp + (Number(item?.price)*item?.quantity)
        })
        setTotal(temp)
    }, [cart, state])
  
  const updateCart = (cart:any) => {
    dispatch({
      type: 'ADD_TO_CART',
      payload: cart,
    })
  }

    const razorpay_payment = async () => {
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
        cart,
        amount: Number(total)+Number(gst),
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
            name: 'EATOS',
            description: '',
            image: '/images/bhatura.png',
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
                cart,
                currency: 'INR',
              }
              axios
                .post('/api/order/success', { body: data }, config)
                .then((res) => {
                  // alert('success')
                  setSuccess(true)
                  setError(false)
                  dispatch({ type: 'LOADING', payload: false })
                  setMessage('Piping Hot Food Ordered Successfully. Delivery soon.')
                  handleSnackbarOpen()
                  dispatch({
                    type: 'ADD_TO_CART',
                    payload: [],
                  })
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
  
  useEffect(() => {
    if (total)
    {//@ts-ignore
      setGST(Number((18 / 100) * total).toFixed(2))
    }
  }, [total])
  
    
  return (
    <div className="p-6 pt-16 text-brand_gray lg:px-16">
      {cart?.length > 0 ? (
        <div className="flex w-full flex-wrap justify-center">
          <div className="w-full md:w-8/12">
            {cart?.map((item: any) => (
              <div
                key={item._id}
                className="scale my-2 flex h-56 flex-wrap items-start justify-center overflow-hidden bg-gray-100 hover:shadow-xl"
              >
                <div className="h-full w-full overflow-hidden md:w-4/12">
                  <img
                    style={{
                      objectFit: 'cover',
                      height: '100%',
                      width: '100%',
                    }}
                    src={item?.img}
                  />
                </div>
                <div className="w-full p-3 md:w-8/12">
                  <div className="flex items-center justify-between">
                    <h2 className="text-md font-bold capitalize">
                      {item?.name}
                    </h2>
                    <div
                      onClick={() => removeFromCart(item)}
                      className="cursor-pointer text-brand_red"
                    >
                      <BsTrashFill />
                    </div>
                  </div>
                  <div
                    className={
                      item.type === 'veg'
                        ? 'flex items-center py-1 text-green-700'
                        : 'flex items-center py-1 text-red-500'
                    }
                  >
                    <MdGpsFixed />
                    <span className="ml-1 text-xs">{item.type}</span>
                  </div>
                  <div className="flex items-center py-1">
                    <IoMdRestaurant />
                    <span className="ml-1 text-xs">{item.restaurant.name}</span>
                  </div>
                  <div className="flex items-center py-1">
                    <HiLocationMarker />
                    <span className="ml-1 text-xs">{item.restaurant.city}</span>
                  </div>
                  <div className="py-1 text-sm">
                    <span> Rs {item.price}/-</span>
                  </div>
                  <div className="flex items-center justify-between py-1 text-sm">
                    <span> Quantity </span>
                    <div className="center overflow-hidden bg-white">
                      <div
                        onClick={() => {
                          item.quantity = item.quantity + 1
                          updateCart(cart)
                        }}
                        className="h-10 cursor-pointer bg-brand_red fill-white p-3 text-white"
                      >
                        <AiOutlinePlus />
                      </div>
                      <div className="h-10 bg-white p-3">{item.quantity}</div>
                      <div
                        onClick={() => {
                          item.quantity = item.quantity - 1
                          updateCart(cart)
                        }}
                        className="h-10 cursor-pointer bg-brand_red p-3 text-white"
                      >
                        <AiOutlineMinus />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="w-full px-3 md:w-4/12">
            <div className="h-full bg-gray-100 p-3">
              <p className="text-md font-bold">Details</p>
              <div className="flex justify-between py-1">
                Total: <span>{total}</span>
              </div>
              <div className="flex justify-between border-b border-brand_gray py-1">
                GST: <span>{gst}</span>
              </div>
              <div className="flex justify-between py-1">
                Grand Total: <span>{Number(total) + Number(gst)}</span>
              </div>
              <button
                onClick={() => {
                  if (user?.email) razorpay_payment()
                }}
                className={
                  user?.email
                    ? 'my-6 w-full rounded-none bg-brand_red py-3 text-white hover:bg-red-700'
                    : 'my-6 w-full cursor-not-allowed rounded-none bg-gray-600 py-3 text-white hover:bg-gray-600'
                }
              >
                {loading ? (
                  <CircularProgress sx={{ color: 'white' }} size={20} />
                ) : (
                  <div>{user?.email ? 'Pay Now' : 'Login to Pay'}</div>
                )}
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="center">Add Items To Cart</div>
      )}

      <Snackbar
        open={snackbar}
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

export default index