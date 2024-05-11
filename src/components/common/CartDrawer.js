import React from "react";
import CartItem from "../cart/CartItem";
import clsx from "clsx";

function CartDrawer({ showCart, setShowCart }) {
  return (
    <div
      className={clsx(
        "absolute right-0 left-0 top-0 bottom-0 bg-[#0000003D] z-[100] overflow-scroll duration-300 ease-in-out",
        showCart ? "block" : "translate-x-[100vw] hidden"
      )}
    >
      <div className="ml-[auto] pb-[50px] lg:w-[622px] min-h-[100vh] bg-[#ffffff] pt-[32px] px-[32px]">
        <div className="flex justify-between items-center">
          <p className="text-[2rem]">SHOPPING BAG (3)</p>
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
          <CartItem />
          <CartItem />
          <CartItem />
          <CartItem />
        </div>

        <div className="mt-[38px] flex justify-between">
          <p className="text-[2rem] font-[700]">TOTAL</p>
          <p className="text-[2rem] font-[700]">₦56,000.00</p>
        </div>
        <button className="mt-[28px] py-[21px] w-[100%] bg-[#242424] rounded-[4px]">
          <p className="text-[#ffffff]">VIEW SHOPPING BAG</p>
        </button>
        <button className="mt-[28px] py-[21px] w-[100%] border-[1px] rounded-[4px] border-[#242424]">
          <p>CONTINUE SHOPPING</p>
        </button>
      </div>
    </div>
  );
}

export default CartDrawer;
