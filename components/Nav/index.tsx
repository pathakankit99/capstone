//@ts-nocheck
import { BsBasketFill } from 'react-icons/bs'
import { FaUserAlt } from 'react-icons/fa'
import Modal from '@mui/material/Modal'
import { useState } from 'react'
import { AiOutlineClose } from 'react-icons/ai'
import TextField from '@mui/material/TextField'
import { useSelector, useDispatch } from 'react-redux'
import { logInUserService, signUpService } from '../../services/user'
import React from 'react'
import Link from 'next/link'
import Snackbar from '@mui/material/Snackbar'
import MuiAlert, { AlertProps } from '@mui/material/Alert'
import { MdOutlineLocalMovies } from 'react-icons/md'
import { FiMenu } from 'react-icons/fi'
import { GrClose } from 'react-icons/gr'

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />
})
const Index = () => {
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

  const { user, loading } = useSelector((state: any) => ({
    user: state.auth_reducer.user,
    loading: state.auth_reducer.loading,
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
    setOption('login')
    setOpen(false)
  }

  const [success, setSuccess] = useState(false)
  const [error, setError] = useState(false)
  const [message, setMessage] = useState('')
  const handleLogin = (e: any) => {
    e.preventDefault()
    const body = {
      identifier,
      password: pass,
    }
    console.log(body, 'body')
    dispatch({
      type: 'LOADING',
      payload: true,
    })
    if (identifier && pass) {
      logInUserService({ body })
        .then((res: any) => {
          setMessage('Login Success')
          console.log(res, 'login success')
          setSuccess(true)
          setError(false)
          localStorage.setItem('accessToken', res.token)
          dispatch({
            type: 'USERLOGIN',
            payload: res.data,
          })
          setTimeout(() => {
            // router.push('/account')
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
          console.log(err, 'login error')
          if (err?.data?.message) {
            setMessage(err.data.message)
          } else {
            setMessage('')
          }
          setError(true)
        })
    } else {
      handleSnackbarOpen()
      setMessage('All Fields Required')
      dispatch({
        type: 'LOADING',
        payload: false,
      })
      setError(true)
      setSuccess(false)
    }
  }
  const handleRegister = (e: any) => {
    e.preventDefault()
    const body = {
      name: username,
      email,
      username,
      password: pass,
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
            setMessage('Account Created Successfully')
            handleSnackbarOpen()
            handleClose()
            setName('')
            setEmail('')
            setPass('')
            setConfirm('')
            setPhone('')
            setUsername('')
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
    } else {
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
  const [menuOpen, setmenuOpen] = useState(false)
  const MobileNav = { true: 'translateX(0%)', false: 'translateX(-100%)' }
  var style = {
    transform: MobileNav[menuOpen],
  }

  return (
    <>
      <nav className="absolute z-50  flex h-16 w-full  items-center justify-between bg-[#1b263b] px-8 text-[#e1f2fe] shadow lg:px-16">
        <div className="flex  lg:w-4/12 items-center  text-white">
        <Link href="/">
          <div className="   text-3xl text-[#A4D6F0]  2xl:text-5xl">
            <MdOutlineLocalMovies />
          </div>
          </Link>
          <h1 className=" font-semibold text:xl lg:text-2xl  2xl:text-2xl">
            Movie Masala Mania
          </h1>
        </div>
        <div className="hidden flex-1 justify-center text-white lg:flex">
          <ul className="text-up flex items-center justify-center text-sm ">
            <Link href="/">
              <li className="cursor-pointer pr-6 font-bold uppercase active:underline">
                Home
              </li>
            </Link>
            <Link href="/book-tickets">
              <li className="cursor-pointer pr-6 font-bold uppercase  active:underline">
                Book Tickets
              </li>
            </Link>
            <Link href="/#upcoming-movies">
              <li className="cursor-pointer pr-6 font-bold uppercase  active:underline">
                Upcoming Movies
              </li>
            </Link>
            <Link href="/#footer">
              <li className="cursor-pointer pr-6 font-bold uppercase  active:underline">
                Contact Us
              </li>
            </Link>
          </ul>
        </div>
        <div className="nav-buttons w-3/12 lg:w-auto flex justify-around text-2xl text-white ">
          {user ? (
            <Link href="/account">
              <div className="account-button mr-2 cursor-pointer w-6/12 p-2">
                <FaUserAlt />
              </div>
            </Link>
          ) : (
            <div className="login-button  mr-2 cursor-pointer p-2 w-6/12" onClick={handleOpen}>
              <FaUserAlt />
            </div>
          )}
          <div className="menu-button flex justify-end text-4xl lg:hidden w-6/12">
            <div>
              {menuOpen ? (
                <GrClose onClick={() => setmenuOpen(!menuOpen)} />
              ) : (
                <FiMenu onClick={() => setmenuOpen(!menuOpen)} />
              )}
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
        <div className="center flex h-90vh  w-full items-center  justify-center bg-black bg-opacity-50 focus:outline-none">
          <div className="relative w-6/12  bg-white p-6">
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
                        className="bg-[#0d1b2a] px-16 py-2 text-white"
                      >
                        Login
                      </button>
                    </div>
                    <div className="">
                      <button
                        className="px-16 py-2 hover:bg-[#0d1b2a] hover:text-white"
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
                        className="bg-[#0d1b2a] px-16 py-2 text-white"
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

      <aside
        style={style}
        className="fixed left-0 right-0 top-0 bottom-0 z-50 min-h-screen w-10/12 bg-gray-800 lg:hidden"
      >
        <div className=" pages border-r pr-3">
          <ul className="block items-center justify-end">
            <li onClick={() => setOpen(false)}>
              <Link href="/">
                <p className="py-6 px-4 text-2xl font-semibold text-white  lg:text-xl lg:text-[#707070] 2xl:text-4xl">
                  Home
                </p>
              </Link>
            </li>
            <li onClick={() => setOpen(false)}>
              <Link href="/#upcoming">
                <p className="px-4 pb-6 text-2xl font-semibold  text-white lg:text-xl lg:text-[#707070] 2xl:text-4xl">
                  Upcoming
                </p>
              </Link>
            </li>
            <li onClick={() => setOpen(false)}>
              <Link href="/book-tickets">
                <p className="px-4 pb-6  text-2xl font-semibold  text-white lg:text-xl lg:text-[#707070] 2xl:text-4xl">
                  Book tickets
                </p>
              </Link>
            </li>
            <li onClick={() => setOpen(false)}>
              <Link href="/#footer">
                <p className="px-4  text-2xl font-semibold  text-white lg:text-xl lg:text-[#707070] 2xl:text-4xl">
                  Contact us
                </p>
              </Link>
            </li>
          </ul>
        </div>
      </aside>
    </>
  )
}

export default Index
