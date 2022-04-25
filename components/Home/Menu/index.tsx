import Slider from 'react-slick'
import axios from 'axios'
import { useState, useEffect } from 'react'

import { MdGpsFixed } from 'react-icons/md'
const Index = () => {
  const [dishes, setdishes] = useState([])
  useEffect(() => {
    axios
      .get('/api/dish')

      .then((res) => setdishes(res?.data?.dishes))
      .catch((err) => console.log(err, 'dishes get error'))
  }, [])
    var settings = {
        autoPlay:false,
      arrows: false,
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 4,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  }
  return (
    <div className="flex items-end bg-brand_gray p-6 lg:h-screen lg:px-16">
      {dishes?.length > 0 && dishes?.length < 5 && (
        <Slider {...settings} className="overflow-hidden">
          {dishes?.map((item: any) => (
            <div key={item._id} className="lg:3/12 w-full p-3 md:w-4/12">
              <div className="scale h-96  overflow-hidden bg-gray-100 text-brand_gray hover:shadow-xl">
                <div
                  className="h-full overflow-hidden"
                  style={{ height: '60%' }}
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
                        ? 'center py-3 text-green-700'
                        : 'center py-3 text-red-500'
                    }
                  >
                    <MdGpsFixed />
                    <span className="ml-2 text-xs">{item.type}</span>
                  </div>
                  {/* <p className="py-3 text-center text-xs">{item.description}</p> */}
                  <p className="border border-brand_gray p-1 text-center text-sm font-medium">
                    Rs {item.price}
                  </p>
                </div>
              </div>
            </div>
          ))}
          {dishes?.map((item: any) => (
            <div key={item._id} className="lg:3/12 w-full p-3 md:w-4/12">
              <div className="scale h-96  overflow-hidden bg-gray-100 text-brand_gray hover:shadow-xl">
                <div
                  className="h-full overflow-hidden"
                  style={{ height: '60%' }}
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
                        ? 'center py-3 text-green-700'
                        : 'center py-3 text-red-500'
                    }
                  >
                    <MdGpsFixed />
                    <span className="ml-2 text-xs">{item.type}</span>
                  </div>
                  {/* <p className="py-3 text-center text-xs">{item.description}</p> */}
                  <p className="border border-brand_gray p-1 text-center text-sm font-medium">
                    Rs {item.price}
                  </p>
                </div>
              </div>
            </div>
          ))}
          {dishes?.map((item: any) => (
            <div key={item._id} className="lg:3/12 w-full p-3 md:w-4/12">
              <div className="scale h-96  overflow-hidden bg-gray-100 text-brand_gray hover:shadow-xl">
                <div
                  className="h-full overflow-hidden"
                  style={{ height: '60%' }}
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
                        ? 'center py-3 text-green-700'
                        : 'center py-3 text-red-500'
                    }
                  >
                    <MdGpsFixed />
                    <span className="ml-2 text-xs">{item.type}</span>
                  </div>
                  {/* <p className="py-3 text-center text-xs">{item.description}</p> */}
                  <p className="border border-brand_gray p-1 text-center text-sm font-medium">
                    Rs {item.price}
                  </p>
                </div>
              </div>
            </div>
          ))}
          {dishes?.map((item: any) => (
            <div key={item._id} className="lg:3/12 w-full p-3 md:w-4/12">
              <div className="scale h-96  overflow-hidden bg-gray-100 text-brand_gray hover:shadow-xl">
                <div
                  className="h-full overflow-hidden"
                  style={{ height: '60%' }}
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
                        ? 'center py-3 text-green-700'
                        : 'center py-3 text-red-500'
                    }
                  >
                    <MdGpsFixed />
                    <span className="ml-2 text-xs">{item.type}</span>
                  </div>
                  {/* <p className="py-3 text-center text-xs">{item.description}</p> */}
                  <p className="border border-brand_gray p-1 text-center text-sm font-medium">
                    Rs {item.price}
                  </p>
                </div>
              </div>
            </div>
          ))}
          {dishes?.map((item: any) => (
            <div key={item._id} className="lg:3/12 w-full p-3 md:w-4/12">
              <div className="scale h-96  overflow-hidden bg-gray-100 text-brand_gray hover:shadow-xl">
                <div
                  className="h-full overflow-hidden"
                  style={{ height: '60%' }}
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
                        ? 'center py-3 text-green-700'
                        : 'center py-3 text-red-500'
                    }
                  >
                    <MdGpsFixed />
                    <span className="ml-2 text-xs">{item.type}</span>
                  </div>
                  {/* <p className="py-3 text-center text-xs">{item.description}</p> */}
                  <p className="border border-brand_gray p-1 text-center text-sm font-medium">
                    Rs {item.price}
                  </p>
                </div>
              </div>
            </div>
          ))}
          {dishes?.map((item: any) => (
            <div key={item._id} className="lg:3/12 w-full p-3 md:w-4/12">
              <div className="scale h-96  overflow-hidden bg-gray-100 text-brand_gray hover:shadow-xl">
                <div
                  className="h-full overflow-hidden"
                  style={{ height: '60%' }}
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
                        ? 'center py-3 text-green-700'
                        : 'center py-3 text-red-500'
                    }
                  >
                    <MdGpsFixed />
                    <span className="ml-2 text-xs">{item.type}</span>
                  </div>
                  {/* <p className="py-3 text-center text-xs">{item.description}</p> */}
                  <p className="border border-brand_gray p-1 text-center text-sm font-medium">
                    Rs {item.price}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </Slider>
      )}
      {dishes?.length > 0 && dishes.length > 4 && (
        <Slider {...settings} className="overflow-hidden">
          {dishes?.map((item: any) => (
            <div key={item._id} className="lg:3/12 w-full p-3 md:w-4/12">
              <div className="scale h-96  overflow-hidden bg-gray-100 text-brand_gray hover:shadow-xl">
                <div
                  className="h-full overflow-hidden"
                  style={{ height: '60%' }}
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
                        ? 'center py-3 text-green-700'
                        : 'center py-3 text-red-500'
                    }
                  >
                    <MdGpsFixed />
                    <span className="ml-2 text-xs">{item.type}</span>
                  </div>
                  {/* <p className="py-3 text-center text-xs">{item.description}</p> */}
                  <p className="border border-brand_gray p-1 text-center text-sm font-medium">
                    Rs {item.price}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </Slider>
      )}
    </div>
  )
}

export default Index
