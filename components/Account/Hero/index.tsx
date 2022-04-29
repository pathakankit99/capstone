const Hero = () => {
    return (
      <div className="bg-brand_gray pt-10">
        <div className="relative h-50vh w-full">
          <img
            className=""
            style={{
              objectFit: 'cover',
              height: '100%',
              width: '100%',
              filter: 'brightness(50%)',
            }}
            src="assets/offer.jpg"
          />
          <div
            style={{ bottom: '-9%' }}
            className="absolute z-50 w-full center"
          >
           
          </div>
        </div>
      </div>
    )
}

export default Hero