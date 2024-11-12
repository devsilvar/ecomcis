import React from "react";
import Header from "../components/common/Header";
import Footer from "../components/common/Footer";
import Container from "../ui/Container";
import Products from "../components/newarrivals/Products";
import { ToastContainer } from "react-toastify";

import { Link } from "react-router-dom";

function NewArrivals() {
  return (
    <div>
      <ToastContainer />
      <Header />
      <div className="py-[20px] px-[40px]">
        <Container className="lg:flex gap-[40px] text-[#4E0240]">
          <h1 className="text-[20px] leading-[22.71px]">NEW ARRIVALS</h1>
        </Container>
      </div>

      <div className="p-5">
        <Products />
      </div>

      <div className="mt-[55px] mb-[100px] flex justify-center">
        <button className="border-[1px] rounded-[4px] px-[92px] py-[14.2px] text-[#4E0240]">
          <Link to="/all-products"> <p>VIEW MORE</p></Link>
        </button>
      </div>
      <Footer />
    </div>
  );
}

export default NewArrivals;
