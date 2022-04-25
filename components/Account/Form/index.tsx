import { useState } from 'react'
import TextField from '@mui/material/TextField'
import { useSelector, useDispatch } from 'react-redux'
import axios from 'axios'
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
  const [data, setData] = useState('')

  const [success, setSuccess] = useState(false)
  const [error, setError] = useState(false)
  const [message, setMessage] = useState('')

  const handleSubmit = (e: any) => {
    e.preventDefault()
    const body = {
      name,
      email,
      message:data,
    }
    dispatch({
      type: 'LOADING',
      payload: true,
    })
      if (name && email && data) {
        axios
          .post('/api/contact', body)
          .then((res: any) => {
            console.log('message sent success')
            setSuccess(true)
            setError(false)
            dispatch({
              type: 'LOADING',
              payload: false,
            })
            setMessage('Message Sent Successfully')
            handleSnackbarOpen()
            setName('')
            setEmail('')
            setData('')
          })
          .catch((err: any) => {
            dispatch({
              type: 'LOADING',
              payload: false,
            })
            setSuccess(false)
            console.log(err.data, 'message sent error')
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
  return (
    <div className="center">
      <div className="w-full pt-16 md:w-6/12">
        <div className="w-full">
          <div className="pb-4">
            <TextField
              type={'text'}
              id="name"
              label="Name"
              variant="outlined"
              fullWidth={true}
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="pb-4">
            <TextField
              type={'email'}
              id="email"
              label="Email"
              variant="outlined"
              fullWidth={true}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="pb-4">
            <TextField
              multiline
              type="text"
              id="message"
              label="Message"
              variant="outlined"
              fullWidth={true}
              value={data}
              rows={4}
              onChange={(e) => setData(e.target.value)}
            />
          </div>
          <div className="center flex-col">
            <div className="pb-1">
              <button
                id="submit"
                onClick={(e) => handleSubmit(e)}
                className="bg-brand_red px-16 py-2 text-white"
              >
                {
                  loading?<CircularProgress sx={{ color: 'white' }} size={ 20}/>:"Submit"
                }
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
