import { useState } from 'react'
import TextField from '@mui/material/TextField'
import { useSelector, useDispatch } from 'react-redux'
import { signUpService } from '../../../services/user'
import React from 'react'
import Link from 'next/link'
import Snackbar from '@mui/material/Snackbar'
import MuiAlert, { AlertProps } from '@mui/material/Alert'
import CircularProgress from '@mui/material/CircularProgress'
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
  const [email, setEmail] = useState('')
  const [name, setName] = useState('')
  const [username, setUsername] = useState('')
  const [phone, setPhone] = useState('')
  const [pass, setPass] = useState('')
  const [confirm, setConfirm] = useState('')

  const [success, setSuccess] = useState(false)
  const [error, setError] = useState(false)
  const [message, setMessage] = useState('')

  const handleRegister = (e: any) => {
    e.preventDefault()
    const body = {
      name: username,
      email,
      username,
      password: pass,
      phone,
      confirm,
      role: 'partner',
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
  return (
    <div className="center">
      <div className="w-full md:w-6/12">
        <h5 className="pb-6 text-center text-2xl font-bold">REGISTER</h5>
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
                {loading ? (
                  <CircularProgress sx={{ color: 'white' }} size={20} />
                ) : (
                  'Register'
                )}
              </button>
            </div>
          </div>
        </div>
      </div>

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

export default Index
