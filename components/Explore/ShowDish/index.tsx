import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { MdGpsFixed } from 'react-icons/md'
import { BsSearch } from 'react-icons/bs'

import { HiLocationMarker } from 'react-icons/hi'
import { IoMdRestaurant } from 'react-icons/io'
import { useSelector, useDispatch } from 'react-redux'


import Radio from '@mui/material/Radio'
import RadioGroup from '@mui/material/RadioGroup'
import FormControlLabel from '@mui/material/FormControlLabel'
import FormControl from '@mui/material/FormControl'
import FormLabel from '@mui/material/FormLabel'

import {useRouter} from 'next/router'
function index() {
  const router = useRouter();
   const [name, setName] = useState(router?.query?.category||'')
  const [category, setCategory] = useState(router?.query?.category||'')
  const [type, setType] = useState(router?.query?.type||'')

  const handleCategory = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCategory((event.target as HTMLInputElement).value)
  }
  const handleType = (event: React.ChangeEvent<HTMLInputElement>) => {
    setType((event.target as HTMLInputElement).value)
  }
  const dispatch = useDispatch();
  const [dishes, setdishes] = useState([])
  const { user, loading, cart } = useSelector((state: any) => ({
    user: state.auth_reducer.user,
    loading: state.auth_reducer.loading,
    cart: state.app_reducer.cart,
  }))
  // console.log(cart, 'cart')
  useEffect(() => {
    const query = `?category=${category}&type=${type}&name=${name}`
    axios
      .get('/api/dish'+query)
      .then((res) => setdishes(res?.data?.dishes))
      .catch((err) => console.log(err, 'dishes get error'))
  }, [router])

  const querySearch = () => {
    const query = `?category=${category}&type=${type}`;
    axios
      .get('/api/dish'+query)
      .then((res) => {
        // console.log(res.data, 'query result');
        setdishes(res?.data?.dishes)
      })
      .catch((err) => console.log(err, 'dishes get error'))
  }

  useEffect(() => {
    const query = `?category=${category}&type=${type}&name=${name}`
    if(router) router?.push('/explore'+query)
    // querySearch()
  }, [type, category, name])

  useEffect(() => {
    if (router?.query?.category) setCategory(router?.query?.category)
    if (router?.query?.type) setType(router?.query?.type)
    if (router?.query?.name) setName(router?.query?.name)
  }, [router])
  
  

  const addToCart = (newCart:any) => {
    dispatch({
      type: 'ADD_TO_CART',
      payload: newCart,
    })
    
  }
  const removeFromCart = (item: any) => {
    const indexOf = cart?.findIndex((e: any) => (e._id == item._id))
    // console.log(indexOf,'index')
    cart.splice(indexOf, 1);
    // console.log(cart, 'cart after removing index')
    dispatch({
      type: 'ADD_TO_CART',
      payload: cart,
    })
  }

  const isPresentInCart = (item: any) => {

    const status = cart?.find((e: any) => {
    if (e._id == item._id) {
      return true;
      }
    else {
      return false;
      }
    })
    return status;
  }


  return (
    <>
      <div className="center w-full pt-12">
        <div className="center w-8/12 border border-brand_gray">
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            className=" flex-1 bg-transparent p-3 text-sm font-bold text-brand_gray focus:outline-none"
            placeholder="Search..."
          />

          <div className="bg-brand_red h-full p-4">
            <BsSearch />
          </div>
        </div>
      </div>
      <div className="flex flex-wrap justify-center p-6 lg:p-16">
        <div className="w-full p-3 text-brand_gray lg:w-2/12">
          <div className="category-filter">
            <FormControl>
              <FormLabel id="demo-radio-buttons-group-label">
                <p className="font-bold">Categories</p>
              </FormLabel>
              <RadioGroup
                aria-labelledby="demo-radio-buttons-group-label"
                defaultValue={category}
                value={category}
                name="radio-buttons-group"
                onChange={handleCategory}
              >
                <FormControlLabel value="" control={<Radio />} label="None" />
                <FormControlLabel
                  value="main-course"
                  control={<Radio />}
                  label="Main Course"
                />
                <FormControlLabel
                  value="thali"
                  control={<Radio />}
                  label="Thali"
                />
                <FormControlLabel
                  value="combos"
                  control={<Radio />}
                  label="Combo"
                />
                <FormControlLabel
                  value="snacks"
                  control={<Radio />}
                  label="Snacks"
                />
                <FormControlLabel
                  value="cakes"
                  control={<Radio />}
                  label="cakes"
                />
                <FormControlLabel
                  value="sweets"
                  control={<Radio />}
                  label="Sweets"
                />
                <FormControlLabel
                  value="drinks"
                  control={<Radio />}
                  label="Drinks"
                />
              </RadioGroup>
            </FormControl>
          </div>
          <div className="type-filter py-16">
            <FormControl>
              <FormLabel id="demo-radio-buttons-group-label">
                <p className="font-bold">Type</p>
              </FormLabel>
              <RadioGroup
                aria-labelledby="demo-radio-buttons-group-label"
                defaultValue={type}
                value={type}
                name="radio-buttons-group"
                onChange={handleType}
              >
                <FormControlLabel value="" control={<Radio />} label="None" />
                <FormControlLabel value="veg" control={<Radio />} label="Veg" />
                <FormControlLabel
                  value="non-veg"
                  control={<Radio />}
                  label="Non Veg"
                />
              </RadioGroup>
            </FormControl>
          </div>
        </div>
        <div className="flex w-full flex-wrap lg:w-10/12">
          {dishes?.length > 0 &&
            dishes?.map((item: any) => (
              <div key={item._id} className=" w-full p-3 md:w-3/12">
                <div className="scale h-96  overflow-hidden bg-gray-100 text-brand_gray hover:shadow-xl">
                  <div
                    className="h-full overflow-hidden"
                    style={{ height: '40%' }}
                  >
                    <img
                      style={{
                        objectFit: 'cover',
                        height: '100%',
                        width: '100%',
                      }}
                      src={item.img}
                    />
                  </div>
                  <div className="p-3">
                    <h4 className="pt-3 text-center text-sm font-bold capitalize text-brand_gray">
                      {item.name}
                    </h4>
                    <div
                      className={
                        item.type === 'veg'
                          ? 'center pb-1 pt-3 text-green-700'
                          : 'center pb-1 pt-3 text-red-500'
                      }
                    >
                      <MdGpsFixed />
                      <span className="ml-2 text-xs">{item.type}</span>
                    </div>
                    <div className="center py-1">
                      <IoMdRestaurant />
                      <span className="ml-1 text-xs">
                        {item.restaurant.name}
                      </span>
                    </div>
                    <div className="center py-1 pb-3">
                      <HiLocationMarker />
                      <span className="ml-1 text-xs">
                        {item.restaurant.city}
                      </span>
                    </div>
                    {/* <p className="py-3 text-center text-xs">{item.description}</p> */}
                    <p className="border border-brand_gray p-1 text-center text-sm font-medium">
                      Rs {item.price}
                    </p>
                    {isPresentInCart(item) ? (
                      <button
                        onClick={() => removeFromCart(item)}
                        className="my-2 w-full rounded-none bg-brand_red text-white hover:bg-red-700"
                      >
                        Remove From Cart
                      </button>
                    ) : (
                      <button
                        onClick={() => {
                          item.quantity = 1
                          addToCart([...cart, item])
                        }}
                        className="my-2 w-full rounded-none bg-brand_red text-white hover:bg-red-700"
                      >
                        Add To Cart
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>
    </>
  )
}

export default index
