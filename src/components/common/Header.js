import React, { useState, useRef, useEffect } from "react";
import Container from "../../ui/Container";
import { IoBagOutline } from "react-icons/io5";
import { CiUser, CiLogout, CiSearch } from "react-icons/ci";
import CurrencyFlag from "./CountryFlags";
import CartDrawer from "./CartDrawer";
import MobileNav from "../../ui/MobileNav";
import { Link } from "react-router-dom";
import Wishlist from "./Wishlist";
import Categories from "./Categories";
import { getProfile } from "../../store/features/account/profile";

import { useDispatch, useSelector } from "react-redux";
import { listCategory } from "../../store/features/product/listCategory";
import { useLocation } from 'react-router-dom';
import { ToastContainer } from "react-toastify";
import SignUpModal from "./SignupModal";
import { getNewsFlash } from "../../store/features/newsFlash/get";
import { Input } from "antd";
import { searchProduct } from "../../store/features/product/searchProduct";

import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

import { formatMoney } from "../../utils/nairaFormat";
import { useCurrency } from "../../utils/CurrencyProvider";

function Header() {
  const [showCart, setShowCart] = useState(false);
  const [showWishList, setShowWishList] = useState(false)
  const [currentPathName, setCurrentPathName] = useState("");
  const [openLoginModal, setOpenLoginModal] = useState(false);
  const [searchItem, setSearchItem] = useState("");
  const searchItemData = useSelector((state) => state.searchProduct);
  const { currency, conversionRate } = useCurrency();

  const location = useLocation();

  const currentPath = location.pathname;
  const pathSegment = currentPath.split('/').filter(Boolean).pop();
  
  useEffect(() =>{
    setCurrentPathName(pathSegment);
  }, [pathSegment]);

  const [isHoveredCategory, setIsHoveredCategory] = useState(false);
  const hoverTimeout = useRef(null);
  const [isDisplayed, setIsDisplayed] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [showSearch, setShowSearch] = useState(false);

  const dispatch = useDispatch();
  const categoryState = useSelector((state) => state.listCategory);
  const profileState = useSelector((state) => state.getProfile);
  const newsFlashState = useSelector((state) => state.getNewsFlash);

  const sessionAuth = sessionStorage.getItem("isAuthenticated");
  const token = localStorage.getItem("authToken")

  const isAuthenticated = sessionAuth || token ;

  useEffect(() => {
    const cart = JSON.parse(localStorage.getItem("cart"));
    if (cart) {
      setCartItems(cart);
    }
  }, []);

  const fetchCategory = () =>{
    dispatch(listCategory())
  }

  const handleLogout =() =>{
    localStorage.removeItem("authToken")
    localStorage.removeItem("rereshToken")
    sessionStorage.removeItem("isAuthenticated")
    window.location.reload();
  }

  const fetchProfile = () =>{
      dispatch(getProfile())
  }

  const fetchNewsFlash = () =>{
    dispatch(getNewsFlash())
  }

  const hanldeOpenLoginModal = () =>{
    setOpenLoginModal(true)
  }

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
    }, 300);
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
    }, 300);
  };

  useEffect(() => {
    return () => {
      if (hoverTimeout.current) {
        clearTimeout(hoverTimeout.current);
      }
    };
  }, []);


  useEffect(()=>{
    if (!categoryState?.data?.length) {
      fetchCategory();
    }

    if (!newsFlashState?.data || newsFlashState?.data.length === 0) {
      fetchNewsFlash();
    }

    if(isAuthenticated){
      fetchProfile()
    }
    
  }, [isAuthenticated])

  const [savedProduct, setSavedProduct] = useState([]); // Initialize with an empty array

  useEffect(() => {
    const savedItem = localStorage.getItem('savedItem');
    if (savedItem) {
      setSavedProduct(JSON.parse(savedItem));
    }

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


  const savedCartItems = localStorage.getItem('cart');
  
  useEffect(() =>{
    if (savedCartItems) {
      setCartItems(JSON.parse(savedCartItems));
    }

    const handleCartItemChange = () => {
      const updatedCartItems = localStorage.getItem('cart');
      if (updatedCartItems) {
        setCartItems(JSON.parse(updatedCartItems));
      }
    };

    window.addEventListener('cartChange', handleCartItemChange);

    return () => {
      window.removeEventListener('cartChange', handleCartItemChange);
    };
  }, [savedCartItems])

  const userName = profileState?.data?.full_name || "User"

  const handleSearch = (e) => {
    e.preventDefault();
    dispatch(searchProduct(searchItem));
  };

  return (
    <>
      <ToastContainer />
      <SignUpModal 
          openLoginModal={openLoginModal} 
          handleCloseModal={() => setOpenLoginModal(false)}
          />
      <CartDrawer showCart={showCart} setShowCart={setShowCart} />
      
      <div className="sticky top-0 w-[100vw] z-50 drop-shadow-md">
        <div className="overflow-hidden whitespace-nowrap bg-[#4E0240]">
            { newsFlashState.data && newsFlashState.data.length > 0 ? (
            <div className={`w-[100%] py-[5px] flex justify-between items-center text-[#000] animate-scroll`}>
              <h2 className="font-voga text-[#fff]">AMARAÉ</h2>
                <h2 className="font-voga text-[#fff]">{newsFlashState.data[0].news}</h2>
            </div>
            ) : (
              <div className={`w-[100%] py-[5px] flex justify-center items-center text-[#000]`}>
                <h2 className="font-voga text-[#fff]">AMARAÉ</h2>
              </div>
            )}

        </div>

        <Container className="py-4 px-3 w-[100%] flex items-center justify-between overflow-hidden text-[#4E0240] hover:text-[#000] bg-[#fff]">
          <div className="flex items-center gap-[10px] px-[10px]">
            <Link to="/" className="text-2xl font-abril">
                <img src="/images/logo-name.svg" alt=""  className="w-[95px]"/>
            </Link>
          </div>

          <div className="lg:flex gap-[26px] hidden">
            <Link className="text-[1rem] text-[#000] hover:text-[#8C033E]" to="/new-arrivals">
              NEW ARRIVALS
            </Link>
            <div
              className="text-[1rem] cursor-pointer text-[#000] hover:text-[#8C033E]"
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              <div className="flex">
                ALL CATEGORY &nbsp; <img className="w-[10px] text-[#000]" src="/images/arrow-down.svg" alt="" />
              </div>
            </div>
            <Link className="text-[1rem] text-[#000] hover:text-[#8C033E]" to="/all-products">
              TRENDING
            </Link>
          </div>

          <div className="lg:flex gap-[19px] hidden items-center cursor-pointer">
            <div
              className="flex gap-[10px] relative "
              onClick={() => setShowWishList(true)}
            >
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
              <p>{cartItems ? cartItems.length : 0}</p>
            </div>

            {isAuthenticated ? (
              <div className="flex">
              <Link to="/account/profile">
                  <div className="flex gap-[10px] p-[10px] background-[#fdfdfd]">
                      {profileState?.data ? "Hi, " + userName : "Hello there"}
                  </div>
              </Link>
              <button onClick={handleLogout}>
                <CiLogout className="h-[24px] w-[24px]"/> 
              </button>
              </div>

            ) : (
                <CiUser 
                    className="h-[24px] w-[24px]" 
                    onClick={hanldeOpenLoginModal} />
            ) }
          </div>

          <div className="flex gap-[10px]">
            <CurrencyFlag className="pointer"/>

            <CiSearch className="h-[24px] w-[24px] cursor-pointer" onClick={() => setShowSearch(!showSearch)} />
          </div>

          <div className={`w-[100%] bg-[#fff] h-[350px] absolute top-[100px] left-[0] ${showSearch ? "block" : "hidden"}`}>
            <div >
              <form className="flex justify-between items-center p-3 w-[90%] lg:w-[50%] m-auto">
                <input 
                    value={searchItem} 
                    type="search"
                    onChange={(e) => setSearchItem(e.target.value)} 
                    className="w-[100%] bg-[#fff] border-[#000] border-[1px] rounded-[5px] p-1 px-2 outline-none"/>
                    &nbsp;
                <button 
                    onClick={handleSearch} 
                    className="bg-[#4E0240] p-[10px] rounded text-[#fff]"><CiSearch /></button>
              </form>
            </div>

            <div className="flex gap-[5px] justify-between items-center p-3 w-[100%] overflow-x-scroll">
                {searchItemData.loading ? (
                  <div className="flex gap-[10px]">
                    <Skeleton variant="circular" width={124} height={124} />
                    <Skeleton variant="circular" width={124} height={124} />
                    <Skeleton variant="circular" width={124} height={124} />
                  </div>
                ) : (
                  <div className="flex gap-[10px]">
                    {searchItemData.data?.map((item) => (
                      <Link className="w-[200px]" to={`/product/${item.id}`} key={item.id} >
                        <img src={item?.images[0]} alt={item.name} className="w-[150px] object-cover" />
                        <p>{item.name}</p>
                        <p>{formatMoney(item.price, currency, conversionRate)}</p>
                      </Link>
                    ))}
                  </div>
                )}
            </div>
            <div onClick={() => setShowSearch(false)} className="h-[calc(100vh-370px)] w-full cursor-pointer"></div>
          </div>


          <MobileNav showCart={showCart} setShowCart={setShowCart} />
        </Container>
        
        <Wishlist showWishList={showWishList} setShowWishList={setShowWishList} />

        {isHoveredCategory && (
          <div
            onMouseEnter={handleContentMouseEnter}
            onMouseLeave={handleContentMouseLeave}
          >
            <Categories categories={categoryState?.data} />
          </div>
        )}
      </div>
    </>
  );
}

export default Header;
