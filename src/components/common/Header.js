import React, { useState } from "react";
import Container from "../../ui/Container";
import { CiSearch } from "react-icons/ci";
import { IoBagOutline } from "react-icons/io5";
import { CiUser } from "react-icons/ci";
import { IoMdMenu } from "react-icons/io";
import CartDrawer from "./CartDrawer";

function Header() {
  const [showCart, setShowCart] = useState(false);
  return (
    <div>
      <Container className="py-[13px] w-[100vw] flex items-center justify-between overflow-hidden">
        <div>
          <img src="/images/logo.svg" alt="" />
        </div>

        <div className="lg:flex gap-[26px] hidden">
          <a className="text-[1rem]" href="/">
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

        <div className="lg:flex gap-[19px] hidden">
          <a href="/">
            <CiSearch className="h-[24px] w-[24px]" />
          </a>
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
            <p>0</p>
          </div>
          <CiUser className="h-[24px] w-[24px]" />
        </div>
        <div className="bg-[#F0F3F7] p-[8px] rounded-[6px] lg:hidden">
          <IoMdMenu className="text-[30px]" />
        </div>
      </Container>
      <CartDrawer showCart={showCart} setShowCart={setShowCart} />
    </div>
  );
}

export default Header;
