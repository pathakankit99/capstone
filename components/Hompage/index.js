
import SliderPage from './Slider'
import Trending from './Trending'
import Upcoming from './Upcoming'
import Footer from '../Footer'
import Nav from '../Nav'
function Homepage(){
    return(
        <div className='collage'>
            <Nav/>
           <SliderPage/>
           <Trending/>
          <Upcoming/>
          <Footer/>
        </div>
    )
}

export default Homepage