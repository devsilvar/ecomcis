import React, { useState, useEffect } from "react";
import { CiUser, CiLogout } from "react-icons/ci";
import { IoMdClose, IoMdMenu } from "react-icons/io";
import { Link } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import { listCategory } from "../store/features/product/listCategory";
import { logOut } from "../store/features/auth/logOut";
import { getProfile } from "../store/features/account/profile";

import Categories from "../components/common/Categories";

import clsx from "clsx";
import { IoBagOutline } from "react-icons/io5";
import Wishlist from "../components/common/Wishlist";

function MobileNav({ setShowCart, showCart }) {
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const profileState = useSelector((state) => state.getProfile);
  const categoryState = useSelector((state) => state.listCategory);
  const [showCategory, setShowCategory] = useState(false);

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
    const cart = JSON.parse(localStorage.getItem("cart"));
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

const [showWishList, setShowWishList] = useState(false)
const [savedProduct, setSavedProduct] = useState([]); // Initialize with an empty array

useEffect(() => {
  // Load the saved product from sessionStorage when the component mounts
  const savedItem = localStorage.getItem('savedItem');
  if (savedItem) {
    setSavedProduct(JSON.parse(savedItem));
  }

  // Listen for the custom storageChange event
  const handleStorageChange = () => {
    const updatedSavedItem = localStorage.getItem('savedItem');
    if (updatedSavedItem) {
      setSavedProduct(JSON.parse(updatedSavedItem));
    }
  };

  window.addEventListener('storageChange', handleStorageChange);

  return () => {
    window.removeEventListener('storageChange', handleStorageChange);
  };
}, []);

const userName = profileState?.data?.full_name || 'User'
  return (
    <div>
      <div className="lg:hidden">
        <IoMdMenu
          className="text-[30px]"
          onClick={() => setShowMobileMenu(!showMobileMenu)}
        />
      </div>

      <div
        className={clsx(
          " fixed bottom-0 left-0 right-0  top-0 z-40 flex  min-h-[50vh] flex-col transition  duration-500 ease-in-out bg-[#fff]",
          showMobileMenu ? "" : "-translate-y-[130vh]"
        )}
      >
        <div className="flex justify-between px-[20px] py-[20px] items-center">
          <Link to={"/"}>
            <img src="/images/logo-name.svg" alt=""  className="w-[65px]"/>
          </Link>

          <div
            onClick={handleClose}
            className=""
          >
            <IoMdClose className="text-[20px]" />
          </div>
        </div>

        <div className="flex flex-col gap-[30px] items-center mt-[100px] ">
          <div className="flex flex-col gap-[26px]">
            <Link className="text-[1rem]" to="/new-arrivals">
              NEW ARRIVALS
            </Link>
            <Link className="text-[1rem]" to="/all-products">
              TRENDING
            </Link>

            <div onClick={() => setShowCategory(!showCategory)}>
              CATEGORIES
            </div>
            <div className={`${showCategory ? "block" : "hidden"} absolute top-[50%] left-0 right-0 bg-[#fff] z-50`}>
              <Categories   categories={categoryState?.data || []} />
            </div>
          </div>

          <div className="flex gap-[19px] ">
            <div className="flex gap-[10px]" onClick={() => setShowWishList(true)}>
              <div>
                <img
                  src="/images/icons/love.svg"
                  alt=""
                  className="h-[24px] w-[24px]"
                />
              </div>
              <p>{savedProduct?.length || 0}</p>
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
            
            <Wishlist showWishList={showWishList} setShowWishList={setShowWishList} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default MobileNav;
