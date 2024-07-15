import clsx from "clsx";
import React from "react";
import { Link } from "react-router-dom";

function ProductCard({ id, image, title, brand, price }) {
  return (
    <Link to={`/product/${id}`}>
      <div className="lg:w-[375px] w-[100%] pb-[30px]">
        <img src={image} className="w-[100%] lg:h-[460px] " alt="" />
        <div className="flex justify-between mt-[16px]">
          <div className="flex flex-col gap-[8px] ">
            <p className="text-[1.5rem]">{title}</p>
            <p className="text-[1.25rem]">{brand}</p>
            <p className="text-[1.25rem]">{price}</p>
          </div>
        </div>
      </div>
    </Link>
  );
}

export default ProductCard;
