import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { MdGpsFixed } from 'react-icons/md'
function index() {
  const [addressess, setaddressess] = useState([])
  useEffect(() => {
    const config = {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
        'Content-Type': 'application/json',
      },
    }
    axios
      .get('/api/address',config)

      .then((res) => {
        // console.log(res.data.addressess)
        setaddressess(res?.data?.addresses)
      })
      .catch((err) => console.log(err, 'addressess get error'))
  }, [])

  // console.log(addressess,'addresses')

  return (
    <div className="">
      {addressess?.length > 0 && (
        <p className="p-3 text-sm font-bold text-brand_gray">My addressess</p>
      )}
      <div className="flex flex-wrap">
        {addressess?.length > 0 &&
          addressess?.map((item: any) => (
            <div key={item._id} className="lg:3/12 w-full p-3 md:w-4/12">
              <div className=" h-44 overflow-hidden bg-gray-100 p-3 text-brand_gray hover:shadow-xl">
                <p className="text-sm font-bold">Room: {item.room}</p>
                <p className="text-sm font-bold">Street: {item.street}</p>
                <p className="text-sm font-bold">Landmark: {item.landmark}</p>
                <p className="text-sm font-bold">Zip: {item.zipcode}</p>
                <p className="text-sm font-bold">
                  Default: {item.default ? 'true' : 'false'}
                </p>
              </div>
            </div>
          ))}
      </div>
    </div>
  )
}

export default index
