import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { HiLocationMarker } from 'react-icons/hi'
function index() {
  const [orders, setOrders] = useState([])
  useEffect(() => {
    const config = {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
        'Content-Type': 'application/json',
      },
    }
    axios
      .get('/api/order', config)

      .then((res) => setOrders(res?.data?.orders))
      .catch((err) => console.log(err, 'order get error'))
  }, [])

  return (
    <div className="">
      {orders?.length > 0 ? (
        <p className="p-3 text-sm font-bold text-brand_gray">My Orders</p>
      ) : (
        <p className="p-3 text-sm font-bold text-brand_gray">
          No Orders Available
        </p>
      )}
      <div className="flex flex-wrap">
        {orders?.length > 0 &&
          orders?.map((item: any) => (
            <div key={item._id} className="lg:3/12 w-full p-3 md:w-4/12">
              <div className="scale h-96  overflow-hidden bg-gray-100 text-brand_gray hover:shadow-xl">
                <div
                  className="relative h-full overflow-hidden"
                  style={{ height: '60%' }}
                >
                  <img
                    style={{
                      objectFit: 'cover',
                      height: '100%',
                      width: '100%',
                    }}
                    src={item.cart[0].img}
                  />
                </div>
                <div className="p-3">
                  <div className="center pt-3">
                    <span className="ml-2 text-xs capitalize font-bold">
                      {new Date(item.updated_at).getDate() +
                        ' - ' +
                        (Number(new Date(item.updated_at).getMonth()) + 1) +
                        ' - ' +
                        new Date(item.updated_at).getFullYear()}
                    </span>
                  </div>
                          <p className="pt-3 text-center text-xs text-brand_red font-bold">Rs {item.amount}</p>
                          {
                              item?.cart?.map((e:any) => (
                                  <div key={e._id} className="items">
                                      <p className='text-brand_gray'>{ item?.quantity}</p>
                                  </div>
                              ))
                          }
                </div>
              </div>
            </div>
          ))}
      </div>
    </div>
  )
}

export default index
