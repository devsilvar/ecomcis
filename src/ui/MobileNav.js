import React, { useState } from "react";
import { CiMenuFries } from "react-icons/ci";
import { IoMdClose } from "react-icons/io";
import { Link } from "react-router-dom";

import clsx from "clsx";

function MobileNav() {
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  const handleClose = () => {
    setShowMobileMenu(!showMobileMenu);
  };
  return (
    <div>
      <CiMenuFries
        className="text-[20px]"
        onClick={() => setShowMobileMenu(!showMobileMenu)}
      />

      <div
        className={clsx(
          " fixed bottom-0 left-0 right-0  top-0 z-40 flex  min-h-[100vh] flex-col transition  duration-500 ease-in-out bg-[#fff]",
          showMobileMenu ? "" : "-translate-y-[130vh]"
        )}
      >
        <div className="flex justify-between px-[20px] py-[20px]">
          <Link to={"/"}>
            <img
              src="/images/logo.png"
              alt="logo"
              className="w-[100px] absolute z-10 -top-[20px]"
            />
          </Link>

          <div onClick={handleClose}>
            <IoMdClose className="text-[30px]" />
          </div>
        </div>

        <div className="flex flex-col gap-[30px] items-center mt-[100px] ">
          <Link>
            <p className="font-[500] text-[14px]">Our Properties</p>
          </Link>
          <Link to={"/about-us"} onClick={handleClose}>
            <p className="font-[500] text-[14px]">About Us</p>
          </Link>
          <Link to={"/services"} onClick={handleClose}>
            <p className="font-[500] text-[14px]">Services</p>
          </Link>
          <Link to={"/contact-us"} onClick={handleClose}>
            <p className="font-[500] text-[14px]">Contact Us</p>
          </Link>
          <Link to={"/login"}>
            <p className="font-[500] text-[14px] border-[2px] py-[10px] px-[20px] rounded-[5px]">
              Login
            </p>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default MobileNav;
