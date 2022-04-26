const Hero = () => {
  return (
    <div className="bg-brand_gray">
      <div className="relative h-50vh w-full">
        <img
          className=""
          style={{
            objectFit: 'cover',
            height: '100%',
            width: '100%',
            filter: 'brightness(50%)',
          }}
          src="/images/cart/hero.jpg"
        />
        <div style={{ bottom: '-9%' }} className="center absolute z-50 w-full">
          <span className="rounded-full bg-brand_red py-3 px-6 lg:px-16">
            <h5 className="text-xl font-bold">Cart</h5>
          </span>
        </div>
      </div>
    </div>
  )
}

export default Hero
