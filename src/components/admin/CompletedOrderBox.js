import React from "react";

function CompletedOrderBox({price, image, owner, name}) {
  return (
    <div className="flex justify-between mt-[10px]">
      <div className="flex gap-[8px]">
        <img src={image} className="w-[32px] h-[32px]" alt="order-image" />
        <div>
          <p className="font-[500] text-[0.75rem]">{name}</p>
          <p className="text-[0.625rem]">{owner}</p>
        </div>
      </div>
      <p className="text-[#4F4F4F]">{price}</p>
    </div>
  );
}

export default CompletedOrderBox;
