import clsx from "clsx";
import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

const NAVOPTIONS = [
  {
    icon: "/images/account/icons/circle-user.svg",
    text: "My Profile",
    path: "/account/profile",
  },
  {
    icon: "/images/icons/bag.svg",
    text: "My Orders",
    path: "/account/my-orders",
  },
  {
    icon: "/images/icons/address.svg",
    text: "Address Book",
    path: "/account/address-book",
  },
  {
    icon: "/images/icons/heart.svg",
    text: "Saved Items",
    path: "/account/saved",
  },
];

function Sidebar() {
  const location = useLocation();
  const { pathname } = location;

  return (
    <div className="md:w-[306px] md:h-[645px] border-[2px] py-[33px] px-[24px] flex md:flex-col gap-[16px] overflow-scroll w-[100%] mb-[10px] md:mb-0">
      {NAVOPTIONS.map((item) => (
        <Link
          key={item.text}
          to={item.path}
          className={clsx(
            "flex gap-[10px] w-[150px] md:w-[100%] flex-none h-[48px] items-center px-[19px]",
            pathname === item.path ? "bg-[#F2F2F2] rounded-[6px]" : ""
          )}
        >
          <img src={item.icon} alt="" />
          <p className="text-nowrap">{item.text}</p>
        </Link>
      ))}
    </div>
  );
}

export default Sidebar;
