import React from "react";
import { useEffect, useState } from "react";
import CartItem from "../product/CartItem";
import clsx from "clsx";
import { Link } from "react-router-dom";

import NairaFormat from "../../utils/nairaFormat";
import { getCart } from "../../store/features/cart/getCart";
import { useDispatch, useSelector } from "react-redux";

function CartDrawer({ showCart, setShowCart }) {


  const [cartItems, setCartItems] = useState([]);

  const dispatch = useDispatch();
  const cartState = useSelector((state) => state.getCart);
  const {data, loading} = cartState;

  const fetchCart = () =>{
    dispatch(getCart("CUS-003-1839")) // update this to be dynamic
  }

  useEffect(()=>{
    fetchCart()
  }, [])


let totalPrice = 0
let itemCount = data ? data.length : 0;


  // itemCount = data.length;
  if (data){
  totalPrice = data.reduce((accumulator, product) => {
    return accumulator + parseFloat(product.total_price);
  }, 0)};


  return (
    <div
      className={clsx(
        "absolute right-0 left-0 top-0 bottom-0 bg-[#0000003D] z-[100] overflow-scroll duration-500 ease-in-out",
        showCart ? "block" : "translate-x-[100vw] hidden"
      )}
    >
      <div className="ml-[auto] pb-[50px] lg:w-[622px] min-h-[100vh] bg-[#ffffff] pt-[32px] px-[32px]">
        <div className="flex justify-between items-center">
          <p className="text-[2rem]">SHOPPING BAG ({itemCount})</p>
          <p
            className="cursor-pointer"
            onClick={() => {
              setShowCart(false);
            }}
          >
            X
          </p>
        </div>
        <div>
          {
           data ? data.map(item =>{
              return <CartItem
                  id={item.id}
                  image={item.product.image.substring(13)}
                  title ={item.product.name}
                  price={NairaFormat.format(item.total_price)}
              />
            }) : ""
          }

        </div>

        <div className="mt-[38px] flex justify-between">
          <p className="text-[2rem] font-[700]">TOTAL</p>
          <p className="text-[2rem] font-[700]">{NairaFormat.format(totalPrice)}</p>
        </div>
        <div className="mt-[28px] py-[21px] w-[100%] bg-[#242424] rounded-[4px]">
            <p className="bg-[#242424] text-center py-[18px] px-[10px] lg:w-[518px] w-[100%] rounded-[4px] text-[#ffffff]">
              <Link to="/checkout">
                  CHECKOUT
              </Link>
            </p>
        </div>
      </div>
    </div>
  );
}

export default CartDrawer;
