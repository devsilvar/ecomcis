import React from "react";
import { IoBagOutline } from "react-icons/io5";

function Wishlist() {
  return (
    <div className="absolute top-[80px] z-[10] border-[1px] right-[440px] w-[622px] h-[255px] bg-[#ffffff]">
      <div className="text-center flex flex-col items-center justify-center my-[44px]">
        <IoBagOutline className="text-[2rem]" />
        <p>Your bag is empty !!</p>
        <p>Check our beautiful collections </p>

        <button className="border-[1px] mt-[24px] py-[10px] px-[20px] rounded-[8px]">
          START SHOPPING
        </button>
      </div>
    </div>
  );
}

export default Wishlist;
