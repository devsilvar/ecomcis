import React from "react";
import Container from "../../ui/Container";
import ProductCard from "../common/ProductCard";

function Recommended() {
  return (
    <div className="pb-[56px] pt-[40px] mt-[40px] bg-[#F8F8F8]">
      <p className="text-center text-[32px]">YOU MIGHT BE INTERESTED IN</p>
      <Container className="flex lg:flex-row flex-col-reverse  gap-[6px] pt-[40px]">
        <div className="flex flex-col 750px:flex-row w-[100%] flex-wrap">
          <ProductCard
            image="/images/product/img2.png"
            // className="lg:w-[calc(100%/3)]"
          />
          <ProductCard
            image="/images/product/img1.png"
            // className="lg:w-[calc(100%/3)]"
          />
          <ProductCard
            image="/images/product/img4.png"
            // className="lg:w-[calc(100%/3)]"
          />
        </div>
      </Container>
    </div>
  );
}

export default Recommended;
