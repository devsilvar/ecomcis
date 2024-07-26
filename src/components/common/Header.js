import React, { useState, useRef, useEffect } from "react";
import Container from "../../ui/Container";
import { CiSearch } from "react-icons/ci";
import { IoBagOutline } from "react-icons/io5";
import { CiUser, CiLogout } from "react-icons/ci";
import { IoMdMenu } from "react-icons/io";
import CartDrawer from "./CartDrawer";
import MobileNav from "../../ui/MobileNav";
import { Link } from "react-router-dom";
import clsx from "clsx";
import Wishlist from "./Wishlist";
import Categories from "./Categories";
import { getProfile } from "../../store/features/account/profile";

import { useDispatch, useSelector } from "react-redux";
import { listCategory } from "../../store/features/product/listCategory";
import { logOut } from "../../store/features/auth/logOut";


function Header() {
  const [showCart, setShowCart] = useState(false);

  const [showSearch, setShowSearch] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isHoveredCategory, setIsHoveredCategory] = useState(false);
  const hoverTimeout = useRef(null);
  const [isDisplayed, setIsDisplayed] = useState(false);
  const [cartItems, setCartItems] = useState([]);

  const dispatch = useDispatch();
  // const cartState = useSelector((state) => state.getCart);
  const categoryState = useSelector((state) => state.listCategory);
  const profileState = useSelector((state) => state.getProfile);

  const sessionAuth = sessionStorage.getItem("isAuthenticated");
  const token = localStorage.getItem("authToken")

  const isAuthenticated = sessionAuth || token ;
  const refreshToken = localStorage.getItem("rereshToken")


  // retrive cart from sessionStorage
  useEffect(() => {
    const cart = JSON.parse(sessionStorage.getItem("cart"));
    if (cart) {
      setCartItems(cart);
    }
  }, []);

  const fetchCategory = () =>{
    dispatch(listCategory())
  }

  const handleLogout =() =>{
    dispatch(logOut(
      {refresh: refreshToken}
    ))
  }

  
  const fetchProfile = () =>{
      dispatch(getProfile())
  }


  const handleMouseEnterWishList = () => {
    setIsHovered(true);
  };

  const handleMouseLeaveWishList = () => {
    setIsHovered(false);
  };

  const handleMouseEnter = () => {
    if (hoverTimeout.current) {
      clearTimeout(hoverTimeout.current);
      hoverTimeout.current = null;
    }
    setIsHoveredCategory(true);
    setIsDisplayed(true);
  };

  const handleMouseLeave = () => {
    hoverTimeout.current = setTimeout(() => {
      setIsHoveredCategory(false);
      setIsDisplayed(false);
    }, 300); // delay before hiding
  };

  const handleContentMouseEnter = () => {
    if (hoverTimeout.current) {
      clearTimeout(hoverTimeout.current);
      hoverTimeout.current = null;
    }
  };

  const handleContentMouseLeave = () => {
    hoverTimeout.current = setTimeout(() => {
      setIsHoveredCategory(false);
      setIsDisplayed(false);
    }, 300); // delay before hiding
  };

  useEffect(() => {
    return () => {
      if (hoverTimeout.current) {
        clearTimeout(hoverTimeout.current);
      }
    };
  }, []);

  


  useEffect(()=>{
    fetchCategory()

    if(isAuthenticated){
      fetchProfile()
    }
    
  }, [isAuthenticated])



  return (
    <div className="sticky top-0 w-[100vw] z-50">
      <div className="h-[50px] w-[100%] bg-[#F2F2F2] flex justify-center items-center text-[#000]">
        <h2 className="font-cormorant font-size">AMARAÉ</h2>
      </div>
      <Container className="p-10 w-[100%] flex items-center justify-around overflow-hidden text-[#4E0240] bg-[#fff]">
        <Link to="/" className="text-2xl font-cormorant">
          {/* <img src="/images/logo.svg" alt="" /> */}
          AMARAÉ
        </Link>

        <div className="lg:flex gap-[26px] hidden">
          <Link className="text-[1rem]" to="/new-arrivals">
            NEW ARRIVALS
          </Link>
          <div
            className="text-[1rem] cursor-pointer"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            ALL CATEGORY
          </div>
          <Link className="text-[1rem]" to="/products">
            TRENDING
          </Link>
        </div>

        <div className="lg:flex gap-[19px] hidden items-center cursor-pointer">
          <div>
            <CiSearch
              className="h-[24px] w-[24px]"
              onClick={() => setShowSearch(!showSearch)}
            />
          </div>
          <input
            placeholder="Search"
            className={clsx(
              "outline-0 border-[1px] py-[10px] px-[20px] rounded-[12px]",
              showSearch ? "w-[250px]" : "w-0 hidden"
            )}
            style={{
              transition: "ease-in-out width 0.5s",
            }}
          />
          <div
            className="flex gap-[10px] relative "
            onMouseEnter={handleMouseEnterWishList}
            onMouseLeave={handleMouseLeaveWishList}
          >
            <div>
              <img
                src="/images/icons/love.svg"
                alt=""
                className="h-[24px] w-[24px]"
              />
            </div>
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
            <p>{cartItems ? cartItems.length : 0}</p>
          </div>

          {isAuthenticated ? (
            <div className="flex">
            <Link to="/account/profile">
                <div className="flex gap-[10px] p-[10px] background-[#fdfdfd]">
                     {profileState?.data ? "Hi, " +profileState?.data?.full_name : "Hello there"}
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
        <MobileNav showCart={showCart} setShowCart={setShowCart} />
      </Container>
      <CartDrawer showCart={showCart} setShowCart={setShowCart} />
      {isHovered && <Wishlist />}
      {isHoveredCategory && (
        <div
          onMouseEnter={handleContentMouseEnter}
          onMouseLeave={handleContentMouseLeave}
        >
          <Categories categories={categoryState?.data} />
        </div>
      )}
    </div>
  );
}

export default Header;
