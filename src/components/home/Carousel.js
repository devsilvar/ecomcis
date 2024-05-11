import React, { useEffect, useRef, useState } from "react";
import Container from "../../ui/Container";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

function Carousel() {
  const [translateX, setTranslateX] = useState(0);
  const boxref = useRef(null);
  const [elementWidth, setElementWidth] = useState(0);
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (boxref.current) {
      setElementWidth(boxref.current.offsetWidth);
    }
  }, []);

  const handleTranslate = () => {
    setTranslateX((prevTranslateX) => prevTranslateX + elementWidth);

    console.log(translateX, value, elementWidth);

    setValue(translateX);
  };
  return (
    <div className="h-[818px] w-[100%]  overflow-hidden">
      <Container className="">
        <div className="absolute bottom-[100px] z-[10]">
          <div>
            <p className="lg:text-[40px] font-[700] text-[24px]">
              SUMMER COLLECTIONS
            </p>
            <div className="mt-[35px] flex gap-[5px]">
              {Array.from({ length: 3 }, (_, index) => {
                return (
                  <div
                    key={index}
                    className="h-[8px] w-[34px] lg:w-[100px] rounded-[2px] bg-[#fff]"
                  ></div>
                );
              })}
            </div>
          </div>
        </div>
      </Container>

      {/* <button onClick={handleTranslate}>Click</button> */}
      <div
        className="w-[300%] h-[100%] flex ease-in duration-300"
        style={{ translate: -translateX }}
      >
        <div
          ref={boxref}
          style={{ backgroundImage: "url('./images/home/slider.png')" }}
          className="w-[calc(100%/3)] h-[100%] relative bg-cover flex-none bg-no-repeat bg-top"
        ></div>
        <div
          ref={boxref}
          style={{ backgroundImage: "url('./images/home/slider.png')" }}
          className="w-[calc(100%/3)] h-[100%] flex-none relative bg-cover bg-no-repeat bg-top"
        ></div>
        <div
          ref={boxref}
          style={{ backgroundImage: "url('./images/home/slider.png')" }}
          className="w-[calc(100%/3)] h-[100%] flex-none relative bg-cover bg-no-repeat bg-top"
        ></div>
      </div>
    </div>
  );
}

export default Carousel;
