import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { MdGpsFixed } from 'react-icons/md'

import { HiLocationMarker } from 'react-icons/hi'
import { IoMdRestaurant } from 'react-icons/io'
import {useSelector, useDispatch} from 'react-redux'
function index() {
  const dispatch = useDispatch();
  const [dishes, setdishes] = useState([])
  const { user, loading, cart } = useSelector((state: any) => ({
    user: state.auth_reducer.user,
    loading: state.auth_reducer.loading,
    cart: state.app_reducer.cart,
  }))
  // console.log(cart, 'cart')
  useEffect(() => {
    axios
      .get('/api/dish')
      .then((res) => setdishes(res?.data?.dishes))
      .catch((err) => console.log(err, 'dishes get error'))
  }, [])

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
    <div className="p-6 lg:p-16">
      <div className="flex flex-wrap">
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
                    <span className="ml-1 text-xs">{item.restaurant.name}</span>
                  </div>
                  <div className="center py-1 pb-3">
                    <HiLocationMarker />
                    <span className="ml-1 text-xs">{item.restaurant.city}</span>
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
  )
}

export default index
