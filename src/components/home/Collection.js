import React from "react";
import { FaArrowRight } from "react-icons/fa6";
import Container from "../../ui/Container";

import { Link } from "react-router-dom";

function Collection() {
  return (
    <div className="pb-[96px]">
      <Container>
        <div className="flex gap-[16px] m-[30px] items-center">
          <Link to="new-arrivals">SHOW COLLECTION</Link>
          <FaArrowRight />
        </div>
      </Container>

      <div>
        <iframe 
            width="1440" 
            height="680" 
            src="https://www.youtube.com/embed/hoKDrFyQDy0" 
            title="Versace Spring-Summer 2023 Women's | Fashion Show | Versace" 
            frameborder="0" 
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
            referrerpolicy="strict-origin-when-cross-origin" 
            allowfullscreen>
        </iframe>
      </div>
      {/* <img src="./images/home/img3.png" alt="" className="w-[100%]" /> */}
    </div>
  );
}

export default Collection;
