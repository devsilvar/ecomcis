import React from "react";
import Navtab from "../../ui/admin/Navtab";
import { AiFillAppstore } from "react-icons/ai";
import AddProductBox from "./AddProductBox";
import { CiLogout } from "react-icons/ci";
import { useNavigate } from "react-router-dom";

const NAVOPTIONS = [
  {
    path: "/admin/dashboard",
    text: "Dashboard",
    icon: "/images/sidebar/grid.svg",
  },
  {
    path: "/admin/orders",
    text: "Orders",
    icon: "/images/sidebar/gold.svg",
  },
  {
    path: "/admin/products",
    text: "Products",
    icon: "/images/sidebar/icon.svg",
  },
  {
    path: "/admin/customers",
    text: "Customers",
    icon: "/images/sidebar/users.svg",
  },
  {
    path: "/admin/reports",
    text: "Reports",
    icon: "/images/sidebar/chart-pie-simple.svg",
  },
  {
    path: "/admin/abandoned-cart",
    text: "Abandoned Cart",
    icon: "/images/sidebar/cart-shopping.svg",
  },
  {
    path: "/admin/admins",
    text: "Admins",
    icon: "/images/sidebar/user-shield.svg",
  },
  {
    path: "/admin/settings",
    text: "Settings",
    icon: "/images/sidebar/settings.svg",
  },
];

function Sidebar({ setShowCart }) {
  const navigate = useNavigate();
  const handleSwitchTab = (selected) => {
    navigate(selected);
  };

  const handleLogOut = ()=>{
    localStorage.removeItem("authToken");
    navigate("/admin/login");
  }

  return (
    <div className="bg-[#1A1A1A] px-[24px] max-w-[304px] min-h-[100vh] h-[100%] flex flex-col items-center overflow-scroll pb-[33px]">
      <div className="mt-[38px]">
        <img src="/images/logo.svg" alt="" />
      </div>
      <div className="mt-[24px] w-[100%] flex flex-col gap-[10px]">
        {NAVOPTIONS.map((item) => (
          <button key={item.text} onClick={() => handleSwitchTab(item.path)}>
            <Navtab text={item.text} icon={item.icon} active={item.path} />
          </button>
        ))}
      </div>
      <div className="mt-[90px] w-[100%]">
        <AddProductBox setShowCart={setShowCart} />
      </div>
      <div className="mt-[50px] w-[100%]">
        <Navtab
          onClick={handleLogOut}
          text="Logout"
          icon={"/images/sidebar/logout.svg"}
          active={"Dashboard"}
          className={"bg-[#FEEAEA] text-[#980E0E] justify-center"}
        />
      </div>
    </div>
  );
}

export default Sidebar;
