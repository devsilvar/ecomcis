import React from "react";
import Container from "../../ui/Container";
import ProductCard from "../common/ProductCard";

function Products() {
  return (
    <Container className="flex lg:flex-row flex-col-reverse  gap-[6px] pt-[40px]">
      <div className="flex gap-[6px] lg:max-w-[762px] w-[100%] flex-wrap">
        <ProductCard />
        <ProductCard />
        <ProductCard />
        <ProductCard />
      </div>
      <div className="flex-1">
        <div className="w-[100%] h-[100%]">
          <img
            src="./images/home/img2.png"
            className="w-[100%] h-[calc(100%-160px)]"
            alt=""
          />
          <div className="flex justify-between mt-[16px]">
            <div className="flex flex-col gap-[8px] ">
              <p className="text-[1.5rem]">Demin Jeans</p>
              <p className="text-[1.25rem]">Gucci Dress</p>
              <p className="text-[1.25rem]">₦56,000.00</p>
            </div>
            <div className="flex gap-[6px] ">
              <div className="w-[18px] h-[18px] rounded-[50%] bg-[blue]"></div>
              <div className="w-[18px] h-[18px] rounded-[50%] bg-[blue]"></div>
              <div className="w-[18px] h-[18px] rounded-[50%] bg-[blue]"></div>
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
}

export default Products;
