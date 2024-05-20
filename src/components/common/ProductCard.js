import React from "react";

function ProductCard({ image, title, brand, price }) {
  return (
    <div className="lg:w-[375px] w-[49%] pb-[30px]">
      <img
        src="/images/home/img2.png"
        className="w-[100%] lg:h-[460px] h-[300px]"
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
  );
}

export default ProductCard;
