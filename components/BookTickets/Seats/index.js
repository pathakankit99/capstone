import { useSelector, useDispatch } from "react-redux";
import axios from 'axios'
function Seats(props){
    const { seats } = useSelector((state) => ({
        seats: state.app_reducer.seats,
      }))
    const dispatch = useDispatch()
    function removeSeat(seat){
        var temp = seats;
        for( var i = 0; i < temp.length; i++){ 
                                   
            if ( temp[i] == seat) { 
                temp.splice(i, 1); 
                i--; 
            }
        }
        return temp;
    }
    function addSeat(seat){
        var temp = seats;
        // console.log(temp.includes(seat),'is seat present')
        
        if(temp.includes(seat))
        {
            temp = removeSeat(seat)
        }
        else{
            temp.push(seat)
        }
        dispatch({
            type: 'SET_SEATS',
            payload: temp,
          })
        // console.log(temp,'selectedSeat')
    }    
    console.log(seats,'seats')
    return(
     <div className=" py-6 flex justify-center ">
           <div className="bg-brand_blue_light p-10 w-full md:w-6/12 lg:w-8/12 rounded-xl ">
            <div className="pt-6 text-white flex flex-wrap justify-center text-2xl font-semibold">
                <h2>SEATS</h2>
            </div>
            <div className="flex flex-wrap pt-10 justify-center">
            {
                props?.seat?.map((item, index)=>{
                    
                    if(index<5)
                    return (<div key={index+Math.random(100)} onClick={()=>addSeat(index)} className={
                        seats.includes(index)?"seat selected":"seat"
                    }>
                    {"A"+(index+1)}
                </div>)
                })
            }
            </div>
            <div className="flex flex-wrap justify-center">
            {
                props?.seat?.map((item, index)=>{
                    
                    if(index>=5&& index<=9)
                    return (<div key={index+Math.random(100)} onClick={()=>addSeat(index)}  className={
                        seats.includes(index)?"seat selected":"seat"
                    }>
                    {"A"+(index+1)}
                </div>)
                })
            }
            </div>
            <div className="flex flex-wrap justify-center">
            {
                props?.seat?.map((item, index)=>{
                    
                    if(index>=10&& index<=14)
                    return (<div key={index+Math.random(100)} onClick={()=>addSeat(index)}  className={
                        seats.includes(index)?"seat selected":"seat"
                    }>
                    {"A"+(index+1)}
                </div>)
                })
            }
            </div>
            <div className="flex flex-wrap justify-center">
            {
                props?.seat?.map((item, index)=>{
                    
                    if(index>=15&& index<=19)
                    return (<div key={index+Math.random(100)} onClick={()=>addSeat(index)}  className={
                        seats.includes(index)?"seat selected":"seat"
                    }>
                    {"A"+(index+1)}
                </div>)
                })
            }
            </div>
        </div>
     </div>
    )
}

export default Seats