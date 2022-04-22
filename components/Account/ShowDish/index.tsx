import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { MdGpsFixed } from 'react-icons/md'
function index() {
  const [dishes, setdishes] = useState([])
  useEffect(() => {
    axios
      .get('/api/dish')

      .then((res) => setdishes(res?.data?.dishes))
      .catch((err) => console.log(err, 'dishes get error'))
  }, [])

  return (
    <div className="">
      {dishes?.length > 0 && (
        <p className="p-3 text-sm font-bold text-brand_gray">My dishes</p>
      )}
      <div className="flex flex-wrap">
        {dishes?.length > 0 &&
          dishes?.map((item: any) => (
            <div key={item._id} className="lg:3/12 w-full p-3 md:w-4/12">
              <div className="scale h-96  overflow-hidden bg-gray-100 text-brand_gray hover:shadow-xl">
                <div
                  className="h-full overflow-hidden"
                  style={{ height: '60%' }}
                >
                  <img
                    style={{ objectFit: 'cover', height: '100%' }}
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
                        ? 'center py-3 text-green-700'
                        : 'center py-3 text-red-500'
                    }
                  >
                    <MdGpsFixed />
                    <span className="ml-2 text-xs">{item.type}</span>
                  </div>
                  {/* <p className="py-3 text-center text-xs">{item.description}</p> */}
                  <p className="text-center text-sm font-medium border border-brand_gray p-1">Rs {item.price}</p>
                </div>
              </div>
            </div>
          ))}
      </div>
    </div>
  )
}

export default index
