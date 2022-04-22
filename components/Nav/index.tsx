import { BsBasketFill } from 'react-icons/bs'
import {FaUserAlt} from "react-icons/fa"
import Modal from '@mui/material/Modal'
import {useState} from 'react'
import { AiOutlineClose } from 'react-icons/ai'
import TextField from '@mui/material/TextField'
import { useSelector, useDispatch } from 'react-redux'
import { logInUserService, signUpService } from '../../services/user'
import React from 'react'
import Link from 'next/link'
import {useRouter} from "next/router"
import Snackbar from '@mui/material/Snackbar'
import MuiAlert, { AlertProps } from '@mui/material/Alert'
const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />
})
const Index = () => {
  const router = useRouter();
  const [snackbar, setSnackbar] = React.useState(false)

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

  const { user, loading, cart } = useSelector((state: any) => ({
    user: state.auth_reducer.user,
    loading: state.auth_reducer.loading,
    cart: state.app_reducer.cart,
  }))
  // console.log(user,'USER')
   const dispatch = useDispatch()
  const [open, setOpen] = useState(false)
  const [option, setOption] = useState('login')
  const [email, setEmail] = useState('')
  const [name, setName] = useState('')
  const [username, setUsername] = useState('')
  const [phone, setPhone] = useState('')
  const [identifier, setIdentifier] = useState('')
  const [pass, setPass] = useState('')
  const [confirm, setConfirm] = useState('')
  const handleOpen = () => setOpen(true)
  const handleClose = () => {
    setOption("login")
    setOpen(false)
  }

  
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState(false)
  const [message, setMessage] = useState('')
  const handleLogin = (e:any) => {
    e.preventDefault()
    const body = {
      identifier,
      password:pass,
    }
    console.log(body,'body')
    dispatch({
      type: 'LOADING',
      payload: true,
    })
    if (identifier && pass) {
      logInUserService({ body })
        .then((res: any) => {
          setMessage("Login Success")
          console.log(res, "login success");
          setSuccess(true)
          setError(false)
          localStorage.setItem('accessToken', res.token)
          dispatch({
            type: 'USERLOGIN',
            payload: res.data,
          })
          setTimeout(() => {
            router.push('/account')
          }, 2000)
          dispatch({
            type: 'LOADING',
            payload: false,
          })
          handleSnackbarOpen()
          handleClose()
        })
        .catch((err: any) => {
          handleSnackbarOpen()
          dispatch({
            type: 'LOADING',
            payload: false,
          })
          setSuccess(false)
          console.log(err, "login error");
          if (err?.data?.message) {
            setMessage(err.data.message)
          } else {
            setMessage('')
          }
          setError(true)
        })
    } else {
      handleSnackbarOpen()
      setMessage("All Fields Required")
      dispatch({
        type: 'LOADING',
        payload: false,
      })
      setError(true)
      setSuccess(false)
    }
  }
  const handleRegister = (e:any) => {
    e.preventDefault()
    const body = {
      name:username,
      email,
      username,
      password:pass,
      phone,
      confirm,
      role: 'user',
      isActive: true,
    }
    dispatch({
      type: 'LOADING',
      payload: true,
    })
    if (confirm === pass) {
      if (username && email) {
        signUpService({ body })
          .then((res: any) => {
            console.log('register success')
            setSuccess(true)
            setError(false)
            dispatch({
              type: 'LOADING',
              payload: false,
            })
            setMessage("Account Created Successfully")
            handleSnackbarOpen()
            handleClose()
            setName("")
            setEmail("")
            setPass("")
            setConfirm("")
            setPhone("")
            setUsername("")
          })
          .catch((err: any) => {
            dispatch({
              type: 'LOADING',
              payload: false,
            })
            setSuccess(false)
            console.log(err.data, 'register error')
            if (err.data.message) {
              setMessage(err.data.message)
            } else {
              setMessage('')
            }
            setError(true)
            handleSnackbarOpen()
          })
      } else {
        dispatch({
          type: 'LOADING',
          payload: false,
        })
        setMessage('Fill All Fields')
        setError(true)
        setSuccess(false)
        handleSnackbarOpen()
      }
    }
    else {
      {
        dispatch({
          type: 'LOADING',
          payload: false,
        })
        setMessage('Passwords Dont Match')
        setError(true)
        setSuccess(false)
        handleSnackbarOpen()
      }
    }
  }
    return (
      <div>
        <nav className="absolute z-50 flex w-full items-center justify-between p-6 lg:px-16">
          <div className="text-4xl font-black text-brand_red">EATOS</div>
          <div className="hidden flex-1 justify-center lg:flex">
            <ul className="flex items-center justify-center text-sm">
              <li className="cursor-pointer pr-6 font-bold uppercase active:underline">
                <Link href="/">Home</Link>
              </li>
              <li className="cursor-pointer pr-6 font-bold uppercase  active:underline">
                <Link href="/contact-us">Contact Us</Link>
              </li>
              <li className="cursor-pointer pr-6 font-bold uppercase  active:underline">
                <Link href="/partner">Partner</Link>
              </li>
            </ul>
          </div>
          <div className="flex text-2xl">
            {user ? (
              <Link href="/account">
                <div className="mr-2 cursor-pointer p-2">
                  <FaUserAlt />
                </div>
              </Link>
            ) : (
              <div className="mr-2 cursor-pointer p-2" onClick={handleOpen}>
                <FaUserAlt />
              </div>
            )}
            <div className="relative rounded-full bg-brand_red p-2">
              <BsBasketFill />
              <div className="absolute -top-1 -right-1 rounded-full bg-yellow-600 px-1 text-xs">
                {cart?.length||0}
              </div>
            </div>
          </div>
        </nav>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <div className="center h-screen w-full bg-black bg-opacity-50 focus:outline-none">
            <div className="relative w-6/12 bg-white p-6">
              <div
                className="absolute top-5 right-5 cursor-pointer"
                onClick={handleClose}
              >
                <AiOutlineClose />
              </div>
              {option === 'login' ? (
                <>
                  <h5 className="pb-6 text-center text-2xl font-bold">LOGIN</h5>
                  <div className="w-full">
                    <div className="pb-4">
                      <TextField
                        id="outlined-basic"
                        label="Username/Email"
                        variant="outlined"
                        fullWidth={true}
                        value={identifier}
                        onChange={(e) => setIdentifier(e.target.value)}
                      />
                    </div>
                    <div>
                      <TextField
                        type={'password'}
                        id="outlined-basic"
                        label="Password"
                        variant="outlined"
                        fullWidth={true}
                        value={pass}
                        onChange={(e) => setPass(e.target.value)}
                      />
                    </div>
                    <p className="py-2 text-center text-sm underline">
                      Lost Your Password?
                    </p>
                    <div className="center flex-col">
                      <div className="pb-1">
                        <button
                          onClick={(e) => handleLogin(e)}
                          className="bg-brand_red px-16 py-2 text-white"
                        >
                          Login
                        </button>
                      </div>
                      <div className="">
                        <button
                          className="px-16 py-2 hover:bg-white hover:text-brand_red"
                          onClick={() => setOption('register')}
                        >
                          Create An Account
                        </button>
                      </div>
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <h5 className="pb-6 text-center text-2xl font-bold">
                    REGISTER
                  </h5>
                  <div className="w-full">
                    <div className="pb-4">
                      <TextField
                        type={'email'}
                        id="outlined-basic"
                        label="Email"
                        variant="outlined"
                        fullWidth={true}
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </div>
                    <div className="pb-4">
                      <TextField
                        type={'password'}
                        id="outlined-basic"
                        label="Password"
                        variant="outlined"
                        fullWidth={true}
                        value={pass}
                        onChange={(e) => setPass(e.target.value)}
                      />
                    </div>
                    <div className="pb-4">
                      <TextField
                        type={'password'}
                        id="outlined-basic"
                        label="Confirm Password"
                        variant="outlined"
                        fullWidth={true}
                        value={confirm}
                        onChange={(e) => setConfirm(e.target.value)}
                      />
                    </div>
                    <div className="pb-4">
                      <TextField
                        id="outlined-basic"
                        label="Username"
                        variant="outlined"
                        fullWidth={true}
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                      />
                    </div>
                    <div className="pb-4">
                      <TextField
                        type="number"
                        id="outlined-basic"
                        label="Phone"
                        variant="outlined"
                        fullWidth={true}
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                      />
                    </div>
                    <p className="py-2 text-center text-sm underline">
                      Lost Your Password?
                    </p>
                    <div className="center flex-col">
                      <div className="pb-1">
                        <button
                          onClick={(e) => handleRegister(e)}
                          className="bg-brand_red px-16 py-2 text-white"
                        >
                          Register
                        </button>
                      </div>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </Modal>
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

export default Index;