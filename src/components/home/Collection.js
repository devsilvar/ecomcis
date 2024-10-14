import React from "react";
import { FaArrowRight } from "react-icons/fa6";
import Container from "../../ui/Container";

import { Link } from "react-router-dom";
import ReactPlayer from 'react-player'

function Collection() {
  return (
    <div className="pb-[96px]">
      <Container>
        <div className="flex gap-[16px] m-[30px] items-center">
          <Link to="new-arrivals">SHOW COLLECTION</Link>
          <FaArrowRight />
        </div>
      </Container>

      <div className="w-[100%] bg-[#F8F8F8]">
        <iframe 
            width="100%" 
            height="680" 
            src="https://www.youtube.com/embed/hoKDrFyQDy0" 
            title="Versace Spring-Summer 2023 Women's | Fashion Show | Versace" 
            frameborder="0" 
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
            referrerpolicy="strict-origin-when-cross-origin" 
            allowfullscreen>
        </iframe>
      </div>
    </div>
  );
}

export default Collection;
