import React from "react";
import { FaRegTrashAlt } from "react-icons/fa";

function CartItem() {
  return (
    <div className="flex gap-[22px] pb-[10px] border-y-[1px] pt-[32px]">
      <img
        src="./images/home/img2.png"
        className="w-[30%] lg:w-[221px] lg:h-[209px] h-[150px]"
        alt=""
      />
      <div>
        <p className="text-[1.75rem] font-[700]">Bikini Short Gown</p>
        <p className="text-[1.5rem] font-[700]">₦56,000.00</p>
        <p className="text-[1.25rem] font-[700]">Color: Teal</p>
        <p className="text-[1.25rem] font-[700]">Size : S</p>

        <div className="flex justify-between mt-[32px] items-center">
          <div className="flex gap-[5px]">
            <p className="w-[36px] text-[1.75rem] border-[1px] rounded-[4px] flex items-center justify-center">
              -
            </p>
            <p className="w-[36px] text-[1.75rem] flex items-center justify-center">
              1
            </p>
            <p className="w-[36px] text-[1.75rem] border-[1px] rounded-[4px] flex items-center justify-center">
              +
            </p>
          </div>

          <div className="flex items-center gap-[5px]">
            <FaRegTrashAlt className="text-[#9C0D00]" />
            <p>Remove</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CartItem;
