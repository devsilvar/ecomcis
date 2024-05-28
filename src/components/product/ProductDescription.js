import React from "react";
import { IoMdHeartEmpty } from "react-icons/io";

function ProductDescription() {
  return (
    <div className="w-[100%] lg:pr-[150px]">
      <div className="px-[24px]">
        <div>
          <p className="text-[0.875rem] font-[700]">home / bikini short</p>
          <p className="text-[1.5rem] py-[15px]">
            Bikini Short Gown WITH WHITE BROWN
          </p>
        </div>
        <div className="border-y-[1px] flex justify-between items-center  px-[8px]">
          <p className="text-[1rem] leading-0">Description</p>
          <p className="text-[2rem] leading-0">+</p>
        </div>
        <div className="border-y-[1px] flex justify-between items-center  px-[8px]">
          <p className="text-[1rem] leading-0">Delivery & Return</p>
          <p className="text-[2rem] leading-0">+</p>
        </div>

        <div className="mt-[32px]">
          <p className="text-[1rem] leading-0">Selcet Color</p>
          <div className="flex gap-[24px] mt-[12px]">
            <div className="w-[50px] h-[50px] rounded-[50%] bg-[#01627F]"></div>
            <div className="w-[50px] h-[50px] rounded-[50%] bg-[#01627F]"></div>
            <div className="w-[50px] h-[50px] rounded-[50%] bg-[#01627F]"></div>
          </div>

          <div className="mt-[32px]">
            <div className="flex justify-between">
              <p className="text-[1rem]">Select a size</p>
              <p className="text-[1rem] underline">Size guide</p>
            </div>
            <div className="flex gap-[24px]">
              <div className="w-[50px] h-[50px] flex items-center justify-center rounded-[50%] border-[1px]">
                <p className="text-[30px]">S</p>
              </div>
              <div className="w-[50px] h-[50px] flex items-center justify-center rounded-[50%] border-[1px]">
                <p className="text-[30px]">M</p>
              </div>
              <div className="w-[50px] h-[50px] flex items-center justify-center rounded-[50%] border-[1px]">
                <p className="text-[30px]">S</p>
              </div>
              <div className="w-[50px] h-[50px] flex items-center justify-center rounded-[50%] border-[1px]">
                <p className="text-[30px]">XL</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="border-t-[1px] mt-[40px] px-[24px]">
        <p className="text-[0.75rem] leading-0 mt-[19px]">Price</p>
        <p className="text-[2rem] leading-0 font-[700]">₦56,000.00</p>

        <div className="mt-[54px] justify-between flex items-center gap-[10px]">
          <button className="bg-[#242424] py-[18px] lg:w-[518px] w-[100%] rounded-[4px] text-[#ffffff]">
            ADD TO BAG
          </button>
          <div className="w-[72px] h-[72px] flex items-center justify-center rounded-[50%] bg-[#F2F2F2]">
            <IoMdHeartEmpty className="text-[42px]" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDescription;
