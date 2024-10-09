import React, { useState, useRef, useEffect } from "react";
import Container from "../../ui/Container";
import { CiSearch } from "react-icons/ci";
import { IoBagOutline } from "react-icons/io5";
import { CiUser, CiLogout } from "react-icons/ci";
import CurrencyFlag from "./CountryFlags";
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
import { logIn } from "../../store/features/auth/loginInFeature";
import { signUp } from "../../store/features/auth/signUpFeature";
import { useLocation } from 'react-router-dom';
import Modal from "./Modal";
import Input from "../admin/form/Input";
import PwdInput from "../passwordInput";
import ClipLoader from "react-spinners/ClipLoader";
import { ToastContainer } from "react-toastify";


function Header() {
  const [showCart, setShowCart] = useState(false);
  const [showWishList, setShowWishList] = useState(false)
  const [currentPathName, setCurrentPathName] = useState("");
  const [openLoginModal, setOpenLoginModal] = useState(false);

  const [showLogin, setShowLogin] = useState(true);
  const [showSignUp, setShowSignUp] = useState(false);

  // login form input
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  const [signUpEmail, setSignUpEmail] = useState("");
  const [signUpPassword, setsetSignUpPassword] = useState("");
  const [signUpFullName, setsetSignUpFullName] = useState("");
  const [signUpPhoneNumber, setsetSignUpPhoneNumber] = useState("");
  
  const sigUpState = useSelector((state) => state.signUp);

  const handleLogin = (e) =>{
    e.preventDefault();
    const payload = {
      username: loginEmail,
      password: loginPassword,
    };
    dispatch(logIn(payload))
  }

  const handleSignUp = (e) => {
    e.preventDefault();
    const payload = {
      email: signUpEmail,
      password: signUpPassword,
      full_name: signUpFullName,
      mobile: signUpPhoneNumber,
      is_active: true,
    };
    dispatch(signUp(payload))
  }

  const handleLoginEmailChange = (e) => {
    setLoginEmail(e.target.value);
  };

  const handleLoginPasswordChange = (e) => {
    setLoginPassword(e.target.value);
  };

  const handleShowLogin = () => {
    setShowLogin(true);
    setShowSignUp(false);
  };

  const handleShowSignUp = () => {
    setShowSignUp(true);
    setShowLogin(false);
  };

  const location = useLocation();

  const currentPath = location.pathname;
  const pathSegment = currentPath.split('/').filter(Boolean).pop();

  const hanldeOpenLoginModal = () =>{
    setOpenLoginModal(true)
  }
  
  useEffect(() =>{
    setCurrentPathName(pathSegment);
  }, [pathSegment]);


  const [showSearch, setShowSearch] = useState(false);
  const [isHoveredCategory, setIsHoveredCategory] = useState(false);
  const hoverTimeout = useRef(null);
  const [isDisplayed, setIsDisplayed] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  const dispatch = useDispatch();
  const categoryState = useSelector((state) => state.listCategory);
  const profileState = useSelector((state) => state.getProfile);
  const products = useSelector((state) => state.listProduct);

  const sessionAuth = sessionStorage.getItem("isAuthenticated");
  const token = localStorage.getItem("authToken")

  const isAuthenticated = sessionAuth || token ;
  const refreshToken = localStorage.getItem("rereshToken")

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
    dispatch(logOut(
      {refresh: refreshToken}
    ))
  }

  const fetchProfile = () =>{
      dispatch(getProfile())
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
    fetchCategory()

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

  const handleSearch = () => {
    setShowSearch(!showSearch);
  };

  return (
    <>
      <ToastContainer />
      <Modal 
          isOpen={openLoginModal} 
          handleClose={() => setOpenLoginModal(false)} 
          title={showLogin ? "Login" : "Sign up"}>
            <div className="flex p-3 justify-center gap-[10px]">
              <button onClick={handleShowLogin} className={`${showLogin ? 'bg-[#4E0240] text-[#fff]' : 'bg-[#fff] text-[#4E0240]'} px-2 py-1 rounded`}>Login</button>
              <button onClick={handleShowSignUp} className={`${showSignUp ? 'bg-[#4E0240] text-[#fff]' : 'bg-[#fff] text-[#4E0240]'} px-2 py-1 rounded`}>Sign Up</button>
            </div>
            <div className={`${showLogin ? 'block' : 'hidden'}`}>
              <form className="flex flex-col gap-[16px] mt-[24px] lg:w-[500px] w-[100%]">
                <Input
                    value={loginEmail} 
                    onChange={handleLoginEmailChange}
                    topText="Email address" type="text" placeholder="Enter your email" />
                <PwdInput 
                    value={loginPassword}
                    onChange={handleLoginPasswordChange}
                    placeholder="Enter your password" />
                <button onClick={handleLogin} className="bg-[#4E0240] text-[#fff] w-[100%] py-[17px] rounded-[8px] mb-[50px] text-[#fff] mt-[23px] my-5 hover:bg-[#000]">
                  Login
                </button>
              </form>
            </div>

            <div className={`${showSignUp ? 'block' : 'hidden'}`}>
            <form className="flex flex-col gap-[16px] mt-[24px] lg:w-[500px] w-[100%]">
              <Input 
                  value={signUpFullName}
                  onChange={(e) => setsetSignUpFullName(e.target.value)}
                  topText="Full Name" 
                  type="text" 
                  placeholder="Enter your full name" />
              <Input 
                  topText="Phone Number" 
                  type="tel" 
                  onChange={(e) => setsetSignUpPhoneNumber(e.target.value)}
                  value={signUpPhoneNumber}
                  placeholder="080122233345" />
              <Input 
                  topText="Email" 
                  type="email" 
                  value={signUpEmail}
                  onChange={(e) => setSignUpEmail(e.target.value)}
                  placeholder="example@gmail.com" />
              <PwdInput 
                  type="password" 
                  value={signUpPassword}
                  onChange={(e) => setsetSignUpPassword(e.target.value)}
                  placeholder="**********" />
              <button onClick={handleSignUp} className="bg-[#4E0240] text-[#fff] w-[100%] py-[17px] rounded-[8px] mb-[50px] text-[#fff] mt-[23px] my-5 hover:bg-[#000]">{sigUpState.loading ? <ClipLoader size={10} />: "Sign Up"}</button>
            </form>
            </div>
      </Modal>


      <CartDrawer showCart={showCart} setShowCart={setShowCart} />
      <div className="sticky top-0 w-[100vw] z-50 drop-shadow-md">
        <div class="overflow-hidden whitespace-nowrap bg-[#4E0240]">
          <div className=" w-[100%] py-[5px] flex justify-around items-center text-[#000] animate-scroll">
            <h2 className="font-voga text-[#fff]">AMARAÉ</h2>
            <h2 className="font-voga text-[#fff]">Discounted Amount on all products</h2>
          </div>
        </div>

        <Container className="py-4 px-10 w-[100%] flex items-center justify-between overflow-hidden text-[#4E0240] hover:text-[#000] bg-[#fff]">
          <div className="px-4 flex items-center gap-[10px]">
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
            {currentPathName === "all-products" ? (
            <div>
              <CiSearch
                className="h-[24px] w-[24px]"
                onClick={() => setShowSearch(!showSearch)}
              />
            </div>
            ) : ""}
            <input
              placeholder="Search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
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
              <button onClick={handleLogout}><CiLogout className="h-[24px] w-[24px]"/> </button>
              </div>

            ) : (
                <CiUser className="h-[24px] w-[24px]" onClick={hanldeOpenLoginModal} />
            ) }
          </div>

          <CurrencyFlag />

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
