import { Carousel } from "antd";
import React from "react";
import Container from "../../ui/Container";

function FeaturedCarousel({ images }) {
  return (
    <Carousel autoplay speed={500}>
      {images.map((image) => (
        <div className="h-[818px]">
          <div
            style={{ backgroundImage: image }}
            className="w-[calc(100%)] h-[100%]  bg-cover flex-none bg-no-repeat bg-top"
          >
            <Container>
              <div className="absolute bottom-[200px] z-[10]">
                <div>
                  <p
                    className="lg:text-[40px] font-[700] text-[24px]"
                    style={{ fontFamily: "CalifoniaFB" }}
                  >
                    SUMMER COLLECTIONS
                  </p>
                </div>
              </div>
            </Container>
          </div>
        </div>
      ))}
    </Carousel>
  );
}

export default FeaturedCarousel;
