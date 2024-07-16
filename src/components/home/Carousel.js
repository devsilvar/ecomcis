import React, { useEffect, useRef, useState } from "react";
import Container from "../../ui/Container";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import FeaturedCarousel from "./FeaturedCarousel";

function Carousel({imagesArray}) {
  const [translateX, setTranslateX] = useState(0);
  const boxref = useRef(null);
  const [elementWidth, setElementWidth] = useState(0);
  const [value, setValue] = useState(0);

  let images = []

  if(imagesArray){
    let latestArray = imagesArray.slice(-3)
    images = [
      `url(${latestArray[0]})`, 
      `url(${latestArray[1]})`,
      `url(${latestArray[2]})`,
    ];
  }else{
    images = [
      "url('./images/home/slider.png')",,
    ]
  }

  return (
    <div className="h-[718px] w-[100%] overflow-scroll relative">
      <FeaturedCarousel images={images} />
    </div>
  );
}

export default Carousel;
