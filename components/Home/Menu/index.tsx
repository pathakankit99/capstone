import Slider from 'react-slick'
const Index = () => {
    var settings = {
        autoPlay:true,
      arrows: false,
    dots: false,
    infinite: true,
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
    <div className="bg-brand_gray p-6 lg:px-16 h-screen flex items-end">
      <Slider {...settings} className="overflow-hidden">
        <div className="h-full border-l focus:outline-none border-gray-500 p-3 text-center">
          <p className="font-bold uppercase">Chhole Bhature</p>
          <img className="py-3" src="images/bhatura.png" />
          <p className="text-gray-500">
            A North Indian dish with chickpeas and puri
          </p>
        </div>
        <div className="h-full border-l focus:outline-none border-gray-500 p-3 text-center">
          <p className="font-bold uppercase">Dosa</p>
          <img className="py-3" src="images/dosa.png" />
          <p className="text-gray-500">
            A South Indian dish with chickpeas and puri
          </p>
        </div>
        <div className="h-full border-l focus:outline-none border-gray-500 p-3 text-center">
          <p className="font-bold uppercase">Aloo Paratha</p>
          <img className="py-3" src="images/parantha.png" />
          <p className="text-gray-500">
            A South Indian dish with chickpeas and puri
          </p>
        </div>
        <div className="h-full border-l focus:outline-none border-gray-500 p-3 text-center">
          <p className="font-bold uppercase">Dosa</p>
          <img className="py-3" src="images/dosa.png" />
          <p className="text-gray-500">
            A South Indian dish with chickpeas and puri
          </p>
        </div>
        <div className="h-full border-l focus:outline-none border-gray-500 p-3 text-center">
          <p className="font-bold uppercase">Dosa</p>
          <img className="py-3" src="images/dosa.png" />
          <p className="text-gray-500">
            A South Indian dish with chickpeas and puri
          </p>
        </div>
      </Slider>
    </div>
  )
}

export default Index
