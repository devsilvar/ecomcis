import React, { useState, useEffect } from "react";
import { CiMenuFries, CiSearch, CiUser } from "react-icons/ci";
import { IoMdClose, IoMdMenu } from "react-icons/io";
import { Link } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import { listCategory } from "../store/features/product/listCategory";
import { getCart } from "../store/features/cart/getCart";

import clsx from "clsx";
import { IoBagOutline } from "react-icons/io5";

function MobileNav({ setShowCart, showCart }) {
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  const handleClose = () => {
    setShowMobileMenu(!showMobileMenu);
  };

  const dispatch = useDispatch();
  const cartState = useSelector((state) => state.getCart);

  const fetchCart = () =>{
    dispatch(getCart("CUS-001-1869")) // update this to be dynamic
  }

  const fetchCategory = () =>{
    dispatch(listCategory())
  }

  useEffect(()=>{
    fetchCart()
    fetchCategory()
  }, [])


  return (
    <div>
      <div className="bg-[#F0F3F7] p-[8px] rounded-[6px] lg:hidden">
        <IoMdMenu
          className="text-[30px]"
          onClick={() => setShowMobileMenu(!showMobileMenu)}
        />
      </div>

      <div
        className={clsx(
          " fixed bottom-0 left-0 right-0  top-0 z-40 flex  min-h-[100vh] flex-col transition  duration-500 ease-in-out bg-[#fff]",
          showMobileMenu ? "" : "-translate-y-[130vh]"
        )}
      >
        <div className="flex justify-between px-[20px] py-[20px] items-center">
          <Link to={"/"}>
            <img src="/images/logo.png" alt="logo" className="w-[100px]" />
          </Link>

          <div
            onClick={handleClose}
            className="bg-[#F0F3F7] p-[8px] rounded-[6px]"
          >
            <IoMdClose className="text-[30px]" />
          </div>
        </div>

        <div className="flex flex-col gap-[30px] items-center mt-[100px] ">
          <div className="flex flex-col gap-[26px]">
            <a className="text-[1rem] " href="/new-arrivals">
              NEW ARRIVALS
            </a>
            <a className="text-[1rem]" href="/about">
              ALL CATEGORY
            </a>
            <a className="text-[1rem]" href="/products">
              ABOUT US
            </a>
            <a className="text-[1rem]" href="/contact">
              CONTACT US
            </a>
          </div>

          <div className="flex gap-[19px] ">
            <div className="flex gap-[10px]">
              <a href="/">
                <img
                  src="/images/icons/love.svg"
                  alt=""
                  className="h-[24px] w-[24px]"
                />
              </a>
              <p>0</p>
            </div>
            <div className="flex gap-[10px]">
              <button>
                <IoBagOutline
                  className="h-[24px] w-[24px]"
                  onClick={() => {
                    setShowCart(true);
                  }}
                />
              </button>
              <p>{cartState.data ? cartState.data.length : "0"}</p>
            </div>
            <CiUser className="h-[24px] w-[24px]" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default MobileNav;
