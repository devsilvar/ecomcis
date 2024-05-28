import React, { useState, useRef, useEffect } from "react";
import Container from "../../ui/Container";
import { CiSearch } from "react-icons/ci";
import { IoBagOutline } from "react-icons/io5";
import { CiUser } from "react-icons/ci";
import { IoMdMenu } from "react-icons/io";
import CartDrawer from "./CartDrawer";
import MobileNav from "../../ui/MobileNav";
import { Link } from "react-router-dom";
import clsx from "clsx";
import Wishlist from "./Wishlist";
import Categories from "./Categories";
import { useGetAllCategoriesQuery } from "../../services/productApi";

function Header() {
  const [showCart, setShowCart] = useState(false);

  const [showSearch, setShowSearch] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isHoveredCategory, setIsHoveredCategory] = useState(false);
  const hoverTimeout = useRef(null);
  const [isDisplayed, setIsDisplayed] = useState(false);

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

  const [allCategories, setAllCategories] = useState([]);

  const { data, error, isError, isLoading } = useGetAllCategoriesQuery();

  useEffect(() => {
    if (!isLoading) {
      if (!isError) {
        setAllCategories(data);
      } else {
        console.log(error);
      }
    }
  }, [isLoading]);

  return (
    <div>
      <Container className="py-[13px] w-[100vw] flex items-center justify-between overflow-hidden">
        <Link to="/">
          <img src="/images/logo.svg" alt="" />
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
            ABOUT US
          </Link>
          <Link className="text-[1rem]" to="/contact">
            CONTACT US
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
            <p>0</p>
          </div>
          <Link to="/register">
            <CiUser className="h-[24px] w-[24px]" />
          </Link>
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
          <Categories categories={allCategories} />
        </div>
      )}
    </div>
  );
}

export default Header;
