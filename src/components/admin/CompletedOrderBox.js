import React from "react";

function CompletedOrderBox() {
  return (
    <div className="flex justify-between mt-[10px]">
      <div className="flex gap-[8px]">
        <img src="/images/image.png" className="w-[32px] h-[32px]" alt="" />
        <div>
          <p className="font-[500] text-[0.75rem]">Corporate Gown</p>
          <p className="text-[0.625rem]">By: Ashley</p>
        </div>
      </div>
      <p className="text-[#4F4F4F]">₦56,000.00</p>
    </div>
  );
}

export default CompletedOrderBox;
