import clsx from "clsx";
import React from "react";
import { Link } from "react-router-dom";

<<<<<<< HEAD
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
=======
function ProductCard({ image, title, price, className }) {
  return (
    <Link
      to="/product/1"
      className={clsx(
        "w-[100%] lg:w-[49%] flex flex-col justify-center items-center",
        className
      )}
    >
      <div className="lg:w-[375px] w-[100%] pb-[30px]">
        <img src={image} className="w-[100%] lg:h-[460px] " alt="" />
        <div className="flex justify-between mt-[16px]">
          <div className="flex flex-col gap-[8px] ">
            <p className="text-[1.5rem]">{title}</p>
            <p className="text-[1.25rem]">₦{price}</p>
>>>>>>> main
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
