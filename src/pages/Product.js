import React from "react";
import Header from "../components/common/Header";
import Footer from "../components/common/Footer";
import Carousel from "../components/product/Carousel";
import ProductDescription from "../components/product/ProductDescription";
import Recommended from "../components/product/Recommended";

function Product() {
  return (
    <div>
      <Header />
      <div className="flex lg:flex-row flex-col">
        <div className="lg:w-[50%] w-[100%]">
          <Carousel />
        </div>
        <div className="lg:w-[50%] mt-[20px] lg:mt-0">
          <ProductDescription />
        </div>
      </div>
      <Recommended />

      <Footer />
    </div>
  );
}

export default Product;
