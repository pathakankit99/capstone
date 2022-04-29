import React, { Component } from "react";
import Slider from "react-slick";
// import dracula from '../../../public/'

function SliderPage() {
    var settings = {
      dots: true,
      infinite: true,
      slidesToShow: 1,
      slidesToScroll: 1,
      autoplay: true,
      autoplaySpeed: 2000,
      pauseOnHover: true,
      arrows:false,
    };
    return (
      <div>
      <Slider className=" pt-16" {...settings}>
          <div className="s-page">
            <img className="s-img" src="assets/starwars.jpg"/>
          </div>
          <div className="s-page">
          <img className="s-img" src="assets/dune.jpg"/>
          </div>
          <div className="s-page">
          <img className="s-img" src="assets/bramhastra.jpg"/>
          </div>
          <div className="s-page">
          <img className="s-img" src="assets/robin.jpg"/>
          </div>
          <div className="s-page">
          <img className="s-img" src="assets/strange.jpg"/>
          </div>
        </Slider>
      </div>
    );
  }

  export default SliderPage


