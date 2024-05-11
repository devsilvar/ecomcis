import React from "react";

function AddProductBox({ setShowCart }) {
  return (
    <div className="text-[#ffffff] flex items-center justify-center flex-col h-[153px] gap-[16px] border-[1px] w-[100%] border-[#ffffff] bg-[#F0EEF21A] rounded-[8px]">
      <div
        className="flex h-[24px] w-[24px] border-[1px] border-[#ffffff] items-center justify-center rounded-[50%] cursor-pointer"
        onClick={() => setShowCart(true)}
      >
        +
      </div>
      <p>Add a product</p>
    </div>
  );
}

export default AddProductBox;
