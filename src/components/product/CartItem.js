import React from "react";

import { useState } from "react";
import { FaRegTrashAlt } from "react-icons/fa";

import { useDispatch, useSelector } from "react-redux";
import { removeCart } from "../../store/features/cart/removeFromCart";


function CartItem({id, title, image, price, color, size, quantity, decreaseQuantity, increaseQuantity, removeCartItem}) {
    const dispatch = useDispatch()
    const removeCartState = useSelector((state) => state.removeCart);


    const handleRemoveCart = ()=>{
      dispatch(removeCart(id))
    }

  return (
    <div className="flex flex-row md:flex-row gap-[22px] pb-[10px] border-y-[1px] pt-[32px] text-[#4E0240]">
      <img
        src={image}
        className="w-[30%]"
        alt=""
      />
      <div>
        <p className="text-[1.5rem] font-[700]">{title}</p>
        <p className="text-[1.5rem] font-[700]">{price}</p>
        {color ? <div className="flex gap-[15px] items-center">
          <p className="text-[1.5rem] font-[700]">Color: </p> <div className="w-[30px] h-[30px] rounded-[50%]" style={{background:color}}></div>
        </div> : ""}
        {
          size ? 
          <p className="text-[1.25rem] font-[700]">Size: {size}</p> : ""
        }

        <div className="flex justify-between space-x-4  mt-[32px] items-center">
          
          <div className="flex gap-[5px]">
            <button 
              className="w-[36px] text-[1.75rem] border-[1px] rounded-[4px] flex items-center justify-center" 
              onClick={decreaseQuantity}>
              -
            </button>
            <p className="cursor-pointer w-[36px] text-[1.75rem] flex items-center justify-center">
              {quantity}
            </p>
            <button 
                className="cursor-pointer w-[36px] text-[1.75rem] border-[1px] rounded-[4px] flex items-center justify-center" 
                onClick={increaseQuantity}>
              +
            </button>
          </div>

          <div onClick={removeCartItem} className="cursor-pointer flex items-center gap-[5px]">
            <FaRegTrashAlt className="text-[#9C0D00]" />
            <p >Remove</p>
          </div>

        </div>

      </div>
    </div>
  );
}

export default CartItem;
