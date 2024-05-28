import React from "react";
import { Link } from "react-router-dom";

function ProductCard({ id, image, title, brand, price }) {
  return (
    <Link to={`/product/${id}`}>
      <div className="lg:w-[375px] w-[49%] pb-[30px]">
        <img src={image} className="w-[100%] lg:h-[460px] h-[300px]" alt="" />
        <div className="flex justify-between mt-[16px]">
          <div className="flex flex-col gap-[8px] ">
            <p className="text-[1.5rem]">{title}</p>
            <p className="text-[1.25rem]">{brand}</p>
            <p className="text-[1.25rem]">{price}</p>
          </div>
          <div className="flex gap-[6px] ">
            <div className="w-[18px] h-[18px] rounded-[50%] bg-[blue]"></div>
            <div className="w-[18px] h-[18px] rounded-[50%] bg-[green]"></div>
            <div className="w-[18px] h-[18px] rounded-[50%] bg-[yellow]"></div>
          </div>
        </div>
      </div>
    </Link>
  );
}

export default ProductCard;
