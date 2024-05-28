import React from "react";
import Container from "../../ui/Container";
import ProductCard from "../common/ProductCard";

function Recommended() {
  return (
    <div className="pb-[56px] pt-[40px] mt-[40px] bg-[#F8F8F8]">
      <p className="text-center text-[32px]">YOU MIGHT BE INTERESTED IN</p>
      <Container className="flex lg:flex-row flex-col-reverse  gap-[6px] pt-[40px]">
        <div className="flex gap-[6px]  w-[100%] flex-wrap">
          <ProductCard image="/images/product/img2.png" />
          <ProductCard image="/images/product/img1.png" />
          <ProductCard image="/images/product/img4.png" />
        </div>
      </Container>
    </div>
  );
}

export default Recommended;
