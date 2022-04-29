import React from 'react'
import axios from 'axios'
import { useState, useEffect } from 'react'
function index() {
  const [Result, setResult] = useState([])
  useEffect(() => {
    const config = {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
        'Content-Type': 'application/json',
      },
    }
    
      axios.get('/api/ticket', config)
      .then((res:any) => {
        setResult(res.data.tickets)
        })
  }, [])
  console.log(Result,'result')
  return(
      <div className='bg-brand_blue md:px-6 lg:px-10'>
        {
          Result?.length >0?(
          <div >
            <div className='bg-brand_blue_light text-center text-xl font-bold text-white pt-4'><h1>Tickets History</h1></div>
            {
              Result?.map((item:any)=>(
                <div className='bg-brand_blue_light p-6' key={item._id}>
                 <div className='flex text-lg text-white font-semibold'>
                 <p>Movie: {" "+item.movie}</p>
                 </div>
                 <div className='flex text-lg text-white font-semibold'>
                 <p>Theatre: {" "+item.theatre}</p>
                 </div>
                 <div className='flex text-lg text-white font-semibold'>
                 <p>Timing: {" "+item.time}</p>
                 </div>
                 <div className='flex items-center text-lg text-white font-semibold'>
                 <p>Seats:</p>
                   {
                   item?.seats?.map((v:any, index:any)=>(
                    <div key={index+Math.random()} className="seat selected">
                      A{v}
                    </div>
                   ))
                 }
                 </div>
               </div>
              ))
            }
          </div>
          ):(<div>No Tickets Available</div>)
        }
    </div>
  )
}

export default index