import { useState, useRef, useEffect } from 'react'
import TextField from '@mui/material/TextField'
import { useSelector, useDispatch } from 'react-redux'
import axios from 'axios'
import React from 'react'
import Snackbar from '@mui/material/Snackbar'
import MuiAlert, { AlertProps } from '@mui/material/Alert'
import CircularProgress from '@mui/material/CircularProgress'

import FormControlLabel from '@mui/material/FormControlLabel'

import Checkbox from '@mui/material/Checkbox'
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
  const [street, setStreet] = useState('')
  const [room, setRoom] = useState('')
  const [city, setCity] = useState('')
  const [zipcode, setZipcode] = useState('')
  const [landmark, setLandmark] = useState('')
  const [def, setDefault] = useState(false)

  const [success, setSuccess] = useState(false)
  const [error, setError] = useState(false)
  const [message, setMessage] = useState('')


  // console.log(restaurants, 'restaurants')

  const handleSubmit = async (e: any) => {
    e.preventDefault()
    if (city && street && zipcode) {
      dispatch({
        type: 'LOADING',
        payload: true,
      })
        const config = {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
            'Content-Type': 'application/json',
          },
      }
       const body = {
         city,
         street,
         landmark,
         zipcode,
         room,
         default:def
      }
      
          axios
            .post('/api/address/create', body, config)
            .then((res: any) => {
              console.log('Address creation success')
              setSuccess(true)
              setError(false)
              dispatch({
                type: 'LOADING',
                payload: false,
              })
              setMessage('Address Created Successfully')
              handleSnackbarOpen()
              setStreet('')
              setCity('')
              setLandmark('')
              setZipcode('')
              setRoom('')
              setDefault(false)
            })
            .catch((err: any) => {
              dispatch({
                type: 'LOADING',
                payload: false,
              })
              setSuccess(false)
              console.log(err?.data, 'address creation error')
              if (err?.data?.message) {
                setMessage(err.data.message)
              } else {
                setMessage('Address Creation Failed')
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
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDefault(event.target.checked)
  }

  return (
    <div className="flex items-start justify-center p-6">
      <div className="w-full">
        <div className="w-full">
          <div className="pb-4">
            <TextField
              type={'text'}
              id="room"
              label="Room"
              variant="outlined"
              fullWidth={true}
              value={room}
              onChange={(e) => setRoom(e.target.value)}
            />
          </div>
          <div className="pb-4">
            <TextField
              type={'text'}
              id="street"
              label="Street"
              variant="outlined"
              fullWidth={true}
              value={street}
              onChange={(e) => setStreet(e.target.value)}
            />
          </div>
          <div className="pb-4">
            <TextField
              id="city"
              label="City"
              variant="outlined"
              fullWidth={true}
              value={city}
              onChange={(e) => setCity(e.target.value)}
            />
          </div>
          <div className="pb-4">
            <TextField
              id="zipcode"
              label="Zipcode"
              variant="outlined"
              fullWidth={true}
              value={zipcode}
              onChange={(e) => setZipcode(e.target.value)}
            />
          </div>

          <div className="pb-4">
            <TextField
              id="landmark"
              label="Landmark"
              variant="outlined"
              fullWidth={true}
              value={landmark}
              onChange={(e) => setLandmark(e.target.value)}
            />
          </div>

          <div className="pb-4">
            <FormControlLabel
              color="primary"
              control={
                <Checkbox
                  id="default"
                  checked={def}
                  onChange={handleChange}
                  inputProps={{ 'aria-label': 'controlled' }}
                />
              }
              label="Set As Default"
            />
          </div>
          <div className="center flex-col">
            <div className="pb-1">
              <button
                id="submit"
                onClick={(e) => handleSubmit(e)}
                className="bg-brand_red px-16 py-2 text-white"
              >
                {loading ? (
                  <CircularProgress sx={{ color: 'white' }} size={20} />
                ) : (
                  'Submit'
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
