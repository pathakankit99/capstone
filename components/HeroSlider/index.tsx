import Slider from 'react-slick'
import { rootCertificates } from 'tls'
const Index = () => {
  const settings = {
    autoplay:true,
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    prevArrow: <SamplePrevArrow />,
    nextArrow: <SampleNextArrow />,
  }
  function SamplePrevArrow(props: any) {
    const { className, style, onClick } = props
    return (
      // <div
      //   className={className}
      //   style={{ ...style, display: 'block', background: 'green' }}

      //   />
      <div
        style={{
          ...style,
          display: 'block',
          top: '50%',
          transform: 'rotate(-90deg)',
          left: '-1.5%',
        }}
        className={
          'absolute z-50 cursor-pointer rounded-full bg-white px-3  py-6 text-xs font-medium text-black'
        }
        onClick={onClick}
      >
        PREV
      </div>
    )
  }
  function SampleNextArrow(props: any) {
    const { className, style, onClick } = props
    return (
      // <div
      //   className={className}
      //   style={{ ...style, display: 'block', background: 'green' }}

      //   />
      <div
        style={{
          ...style,
          display: 'block',
          top: '50%',
          transform: 'rotate(-90deg)',
          right: '-1.5%',
        }}
        className={
          'absolute z-50 cursor-pointer rounded-full bg-white px-3  py-6 text-xs font-medium text-black'
        }
        onClick={onClick}
      >
        NEXT
      </div>
    )
  }
  return (
    <div className="">
      <Slider {...settings} className="h-screen overflow-hidden">
        <div className="h-full w-full">
          <div className="relative">
            <img
              style={{ height: '100vh', objectFit: 'cover', width: '100%' }}
              src="/images/banner-1.jpg"
            />
            <div className="center absolute top-0 bottom-0 left-0 right-0 z-50 h-screen">
              <img
                className="absolute top-20 left-0 md:left-40 "
                width={150}
                src="/images/chef-hat.png"
              />
              <div className="uppercase">
                <p className="font-italic text-center font-black md:text-3xl lg:text-5xl">
                  Maa Ki Rasoi
                </p>
                <p className="font-italic text-center font-black md:text-3xl lg:text-5xl">
                  Nothing More Perfect
                </p>
                <div className="center pt-6">
                  <button>Order Now</button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div>
          <div className="relative">
            <img
              style={{ height: '100vh', objectFit: 'cover', width: '100%' }}
              src="/images/banner-2.jpg"
            />
          </div>
        </div>
        <div>
          <div className="relative">
            <img
              style={{ height: '100vh', objectFit: 'cover', width: '100%' }}
              src="/images/banner-3.jpg"
            />
          </div>
        </div>
      </Slider>
    </div>
  )
}

export default Index
