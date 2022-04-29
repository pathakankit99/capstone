import{MdOutlineLocalMovies,MdMail} from 'react-icons/md'
import {BsFacebook,BsInstagram,BsTwitter} from 'react-icons/bs'




function Footer(){
    return(
        <footer id='footer' >
            <div className='flex justify-center text-white items-center'>
                 <div className='  text-3xl  2xl:text-5xl text-[#A4D6F0]'>
                     <MdOutlineLocalMovies/>
                 </div>
                 <h1 className='text-xl 2xl:text-2xl font-semibold'>Movie Masala Mania</h1>
              </div>
              <div className='flex justify-center py-6  text-2xl  2xl:text-4xl text-white'>
                  <div className='social' >
                      <BsFacebook/>
                  </div>
                  <div className='px-4 2xl:px-6 social' >
                      <BsInstagram/>
                  </div>
                  <div className='social'>
                      <MdMail/>
                  </div>
                  <div className='px-4 2xl:px-6  social'>
                      <BsTwitter/>
                  </div>
              </div>
        </footer>
    )
}
export default Footer