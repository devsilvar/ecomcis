import React from "react";
import Header from "../components/common/Header";
import Footer from "../components/common/Footer";
import Carousel from "../components/cart/Carousel";
import ProductDescription from "../components/cart/ProductDescription";
import Recommended from "../components/cart/Recommended";

function Cart() {
  return (
    <div>
      <Header />
      <div className="flex lg:flex-row flex-col lg:pr-[150px]">
        <div className="lg:w-[743px] w-[100%]">
          <Carousel />
        </div>
        <div className="flex-1">
          <ProductDescription />
        </div>
      </div>
      <Recommended />
      <Footer />
    </div>
  );
}

export default Cart;
