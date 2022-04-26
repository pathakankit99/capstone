import { BsSearch } from 'react-icons/bs'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import ShowDish from '../ShowDish'
const Hero = () => {
 

  return (
    <div className="">
      <div className="relative h-50vh w-full">
        <img
          className=""
          style={{
            objectFit: 'cover',
            height: '100%',
            width: '100%',
            filter: 'brightness(50%)',
          }}
          src="/images/explore/hero.jpg"
        />
        <div style={{ bottom: '-9%' }} className="center absolute z-50 w-full">
          <span className="flex items-center rounded-full bg-brand_red py-3 px-6 lg:px-16">
           
            <h5>Explore our offerings</h5>
          </span>
        </div>
      </div>
    </div>
  )
}

export default Hero
