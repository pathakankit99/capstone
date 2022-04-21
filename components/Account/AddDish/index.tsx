//@ts-nocheck
import { useState, useRef, useEffect } from 'react'
import TextField from '@mui/material/TextField'
import { useSelector, useDispatch } from 'react-redux'
import axios from 'axios'
import React from 'react'
import Snackbar from '@mui/material/Snackbar'
import MuiAlert, { AlertProps } from '@mui/material/Alert'
import CircularProgress from '@mui/material/CircularProgress'
import MenuItem from '@mui/material/MenuItem'
import { Cloudinary } from '@cloudinary/url-gen'
const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />
})
const cld = new Cloudinary({
  cloud: {
    cloudName: 'ak99',
  },
})
const Index = () => {
  const uploadInputRef = useRef(null)
  const [snackbar, setSnackbar] = React.useState(false)
  const [restaurants, setRestaurants] = useState([])

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
  const [type, setType] = useState('')
  const [name, setName] = useState('')
  const [price, setPrice] = useState(0)
  const [description, setDescription] = useState('')
  const [selectedFile, setSelectedFile] = useState(null)
  const [restaurant, setRestaurant] = useState('')

  const [success, setSuccess] = useState(false)
  const [error, setError] = useState(false)
  const [message, setMessage] = useState('')

  useEffect(() => {
    axios
      .get('/api/restaurant')

      .then((res) => setRestaurants(res?.data?.restaurants))
  }, [])

  console.log(restaurants, 'restaurants')

  const handleSubmit = async (e: any) => {
    e.preventDefault()

    const formData = new FormData()
    var config = {
      headers: { 'content-type': 'multipart/form-data' },
    }
    formData.append('api_key', '491118498872778')
    formData.append('folder', 'eatos/dish')
    formData.append('file', selectedFile)
    formData.append('upload_preset', 'unsigned')
    if (name && type && description) {
      dispatch({
        type: 'LOADING',
        payload: true,
      })

      await axios
        .post(
          'https://api.Cloudinary.com/v1_1/:ak99/image/upload',
          formData,
          config
        ) //Put this inside a loop
        .then((res) => {
          console.log(res)
          const data = res.data
          const image_url = data.secure_url
          console.log('image url is ', image_url)
          config = {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
              'Content-Type': 'application/json',
            },
          }

          const body = {
            name,
            type,
            description,
            img: image_url,
            restaurant,
            price,
          }
          axios
            .post('/api/dish/create', body, config)
            .then((res: any) => {
              console.log('dish creation success')
              setSuccess(true)
              setError(false)
              dispatch({
                type: 'LOADING',
                payload: false,
              })
              setMessage('Dish Created Successfully')
              handleSnackbarOpen()
              setName('')
              setDescription('')
              setType('')
              setPrice(0)
              setRestaurant("")
            })
            .catch((err: any) => {
              dispatch({
                type: 'LOADING',
                payload: false,
              })
              setSuccess(false)
              console.log(err.data, 'dish creation error')
              if (err.data.message) {
                setMessage(err.data.message)
              } else {
                setMessage('Dish Creation Failed')
              }
              setError(true)
              handleSnackbarOpen()
            })
        })
        .catch((err) => console.log('cloudinary error', err))
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
  useEffect(() => {
    console.log(restaurant, 'restaurant')
  }, [selectedFile, restaurant])

  return (
    <div className="flex items-start justify-center p-6">
      <div className="w-full">
        <div className="w-full">
          <div className="pb-4">
            <TextField
              type={'text'}
              id="outlined-basic"
              label="Dish Name"
              variant="outlined"
              fullWidth={true}
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="pb-4">
            <TextField
              select
              id="outlined-basic"
              label="Type"
              variant="outlined"
              fullWidth={true}
              value={type}
              onChange={(e) => setType(e.target.value)}
            >
              <MenuItem value="veg">Veg</MenuItem>
              <MenuItem value="non-veg">Non-Veg</MenuItem>
            </TextField>
          </div>

          <div className="pb-4">
            <TextField
              select
              id="outlined-basic"
              label="Restaurant"
              variant="outlined"
              fullWidth={true}
              value={restaurant}
              onChange={(e) => setRestaurant(e.target.value)}
            >
              {restaurants?.length > 0 &&
                restaurants.map((item) => <MenuItem key={item._id} value={item._id}>{item.name}</MenuItem>)}
            </TextField>
          </div>
          <div className="pb-4">
            <TextField
              multiline
              type="text"
              id="outlined-basic"
              label="Description"
              variant="outlined"
              fullWidth={true}
              value={description}
              rows={4}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          <div className="pb-4">
            <TextField
              type={'number'}
              id="outlined-basic"
              label="Price"
              variant="outlined"
              fullWidth={true}
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
          </div>
          <div className="center flex-wrap pb-4">
            <div className="w-full md:w-8/12">
              <input
                ref={uploadInputRef}
                accept="image/*"
                onChange={() =>
                  //@ts-ignore
                  setSelectedFile(document?.getElementById('file').files[0])
                }
                id="file"
                type="file"
                hidden
              />
              <label htmlFor="file">
                <button
                  className="rounded-none border border-brand_gray bg-slate-400 hover:bg-slate-400 hover:text-black"
                  onClick={() =>
                    uploadInputRef.current && uploadInputRef.current.click()
                  }
                >
                  {selectedFile?.name ? 'Change File' : 'Upload File'}
                </button>
                <p className="text-xs text-black">
                  {selectedFile?.name
                    ? '*' + selectedFile?.name + ' selected'
                    : ''}
                </p>
              </label>
            </div>
            <div className="w-full md:w-4/12">
              <img src="/images/account/placeholder.jpg" />
            </div>
          </div>
          <div className="center flex-col">
            <div className="pb-1">
              <button
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
