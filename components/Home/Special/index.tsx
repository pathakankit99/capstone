import { useEffect, useState } from "react"
import axios from 'axios'
const index = () => {
  const [combos, setCombos] = useState([])
  useEffect(() => {
     axios
       .get('/api/dish?category=combos')
       .then((res) => setCombos(res?.data?.dishes))
       .catch((err) => console.log(err, 'dishes get error'))
  }, [])

  if (combos?.length === 0)
    return <></>
  
  return (
    <div className="relative">
      <img
        className="absolute top-0 bottom-0 -z-10"
        style={{ height: '100%', objectFit: 'cover', width: '100%' }}
        src="/images/offer.png"
      />
      <div className=" p-6 lg:px-16">
        <div className="center pt-16">
          <span className="clip bg-brand_red px-6 py-2">
            Tasty Homemade Food
          </span>
        </div>
        <h5 className="pt-4 text-center text-4xl font-bold">
          Special Price Combo
        </h5>
        <p className="pt-2 text-center text-gray-500">
          Inspired by recipes and creations of world’s best chefs
        </p>

        <div className="flex flex-wrap items-center justify-center pt-16">
          {combos?.map((item: any) => (
            <div key={item._id} className="center card w-full p-3 pt-6 md:w-6/12">
              <div className="w-8/12">
                <div className="">
                  <span className="rounded-xl bg-green-600 px-8 py-1 text-xs font-bold">
                    Hot
                  </span>
                  <h6 className="pt-1 pb-3 text-xl font-bold uppercase">
                    {item.name}
                  </h6>
                  <p className="text-sm text-gray-500">
                   {item.description}
                  </p>
                </div>
              </div>
              <div className="w-4/12 pr-6 text-right">
                <p className="font-bold text-brand_red">Rs {item.price}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default index
