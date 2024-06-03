import React from "react";

import { useState } from "react";
import { FaRegTrashAlt } from "react-icons/fa";

import { useDispatch, useSelector } from "react-redux";
import { removeCart } from "../../store/features/cart/removeFromCart";


function CartItem({id, title, image, price, color, size}) {
    let [quantity, setQuantity] = useState(1)
    const dispatch = useDispatch()
    const removeCartState = useSelector((state) => state.removeCart);

    const {data, error, loading} = removeCartState

    const handleRemoveCart = ()=>{
      dispatch(removeCart(id))
    }


    const increaseQuantity = () => {
      setQuantity(prevQuantity => prevQuantity + 1);
    }
  
    const decreaseQuantity = () => {
      setQuantity(prevQuantity => {
        if (prevQuantity > 1) {
          return prevQuantity - 1;
        } else {
          return 1;
        }
      });
    }

    // Call remove cart item with the id

  return (
    <div className="flex gap-[22px] pb-[10px] border-y-[1px] pt-[32px]">
      <img
        src={image}
        className="w-[30%] lg:w-[221px] lg:h-[209px] h-[150px]"
        alt=""
      />
      <div>
        <p className="text-[1.75rem] font-[700]">{title}</p>
        <p className="text-[1.5rem] font-[700]">{price}</p>
        <p className="text-[1.25rem] font-[700]">Color: {color}</p>
        <p className="text-[1.25rem] font-[700]">Size: {size}</p>

        <div className="flex justify-between space-x-4  mt-[32px] items-center">
          
          <div className="flex gap-[5px]">
            <p 
              className="w-[36px] text-[1.75rem] border-[1px] rounded-[4px] flex items-center justify-center" 
              onClick={decreaseQuantity}>
              -
            </p>
            <p className="cursor-pointer w-[36px] text-[1.75rem] flex items-center justify-center">
              {quantity}
            </p>
            <p 
                className="cursor-pointer w-[36px] text-[1.75rem] border-[1px] rounded-[4px] flex items-center justify-center" 
                onClick={increaseQuantity}>
              +
            </p>
          </div>

          <div className="cursor-pointer flex items-center gap-[5px]">
            <FaRegTrashAlt className="text-[#9C0D00]" />
            <p onClick={(id)=>handleRemoveCart(id)} >Remove</p>
          </div>

        </div>

      </div>
    </div>
  );
}

export default CartItem;
