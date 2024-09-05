import React, { useState, useEffect } from "react";
import { CiUser, CiLogout } from "react-icons/ci";
import { IoMdClose, IoMdMenu } from "react-icons/io";
import { Link } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import { listCategory } from "../store/features/product/listCategory";
import { logOut } from "../store/features/auth/logOut";
import { getProfile } from "../store/features/account/profile";

import clsx from "clsx";
import { IoBagOutline } from "react-icons/io5";

function MobileNav({ setShowCart, showCart }) {
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const profileState = useSelector((state) => state.getProfile);

  const handleClose = () => {
    setShowMobileMenu(!showMobileMenu);
  };

  const dispatch = useDispatch();

  const fetchCategory = () =>{
    dispatch(listCategory())
  }

  const sessionAuth = sessionStorage.getItem("isAuthenticated");
  const token = localStorage.getItem("authToken")

  const isAuthenticated = sessionAuth || token ;
  const refreshToken = localStorage.getItem("rereshToken")

  useEffect(()=>{
    fetchCategory()
  }, [])


  // retrive cart from sessionStorage
  useEffect(() => {
    const cart = JSON.parse(sessionStorage.getItem("cart"));
    if (cart) {
      setCartItems(cart);
    }
  }, []);

  const handleLogout =() =>{
    dispatch(logOut(
      {refresh: refreshToken}
    ))
  }

  const fetchProfile = () =>{
    dispatch(getProfile())
}


useEffect(()=>{
  fetchCategory()

  if(isAuthenticated){
    fetchProfile()
  }
  
}, [isAuthenticated])

const userName = profileState?.data?.full_name || 'User'
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
            <img src="/images/logo-name.svg" alt=""  className="w-[65px]"/>
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
            <Link className="text-[1rem]" to="/new-arrivals">
              NEW ARRIVALS
            </Link>
            <Link className="text-[1rem]" to="/products">
              TRENDING
            </Link>
          </div>

          <div className="flex gap-[19px] ">
            <div className="flex gap-[10px]">
              <Link to="/">
                <img
                  src="/images/icons/love.svg"
                  alt=""
                  className="h-[24px] w-[24px]"
                />
              </Link>
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
              <p>{cartItems ? cartItems.length : "0"}</p>
            </div>
            {isAuthenticated ? (
              <div className="flex">
              <Link to="/account/profile">
                  <div className="flex gap-[10px] p-[10px] background-[#fdfdfd]">
                      {profileState?.data ? "Hi, " + userName : "Hello there"}
                  </div>
              </Link>
              <button onClick={handleLogout}><CiLogout className="h-[24px] w-[24px]"/> </button>
              </div>

            ) : (
              <Link to="/register">
                <CiUser className="h-[24px] w-[24px]" />
              </Link>
            ) }
            
          </div>
        </div>
      </div>
    </div>
  );
}

export default MobileNav;
