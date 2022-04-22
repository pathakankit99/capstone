import React, {useEffect, useState} from 'react'
import axios from 'axios'
import {HiLocationMarker} from "react-icons/hi"
function index() {
  const [restaurants, setRestaurants] = useState([])
  useEffect(() => {
     const config = {
       headers: {
         Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
         'Content-Type': 'application/json',
       },
     }
     axios
       .get('/api/restaurant', config)

       .then((res) => setRestaurants(res?.data?.restaurants))
       .catch((err) => console.log(err, 'restaurant get error'))
   }, [])
  
  return (
    <div className="">
      {restaurants?.length > 0 && (
        <p className="p-3 text-sm font-bold text-brand_gray">My Restaurants</p>
      )}
      <div className="flex flex-wrap">
        {restaurants?.length > 0 &&
          restaurants?.map((item: any) => (
            <div key={item._id} className="lg:3/12 w-full p-3 md:w-4/12">
              <div className="scale h-96  overflow-hidden bg-gray-100 text-brand_gray hover:shadow-xl">
                <div
                  className="relative h-full overflow-hidden"
                  style={{ height: '60%' }}
                >
                  <img
                    style={{ objectFit: 'cover', height: '100%' , width:"100%"}}
                    src={item.img}
                  />
                  {item.type === 'veg' && (
                    <div className="absolute top-0 bg-green-600 p-3 text-sm font-medium text-white">
                      100% Veg
                    </div>
                  )}
                </div>
                <div className="p-3">
                  <h4 className="pt-3 text-center text-sm font-bold capitalize text-brand_gray">
                    {item.name}
                  </h4>
                  <div className="center pt-3">
                    <HiLocationMarker />
                    <span className="ml-2 text-xs capitalize">{item.city}</span>
                  </div>
                  <p className="pt-3 text-center text-xs">{item.description}</p>
                </div>
              </div>
            </div>
          ))}
      </div>
    </div>
  )
}

export default index