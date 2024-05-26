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
    icon: "/images/account/icons/circle-user.svg",
    text: "My Orders",
    path: "/account/my-orders",
  },
  {
    icon: "/images/account/icons/circle-user.svg",
    text: "Address Book",
    path: "/account/address-book",
  },
  {
    icon: "/images/account/icons/circle-user.svg",
    text: "Saved Items",
    path: "/account/saved",
  },
];

function Sidebar() {
  const location = useLocation();
  const { pathname } = location;

  return (
    <div className="w-[306px] h-[645px] border-[2px] py-[33px] px-[24px] flex flex-col gap-[16px]">
      {NAVOPTIONS.map((item) => (
        <Link
          key={item.text}
          to={item.path}
          className={clsx(
            "flex gap-[10px] w-[100%] h-[48px] items-center px-[19px]",
            pathname === item.path ? "bg-[#F2F2F2] rounded-[6px]" : ""
          )}
        >
          <img src={item.icon} alt="" />
          <p>{item.text}</p>
        </Link>
      ))}
    </div>
  );
}

export default Sidebar;
