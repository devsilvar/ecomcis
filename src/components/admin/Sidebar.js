import React from "react";
import Navtab from "../../ui/admin/Navtab";

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
  {
    path: "/admin/extras",
    text: "Extras",
    icon: "/images/sidebar/extra.svg",
  },
];

function Sidebar() {
  const navigate = useNavigate();
  const handleSwitchTab = (selected) => {
    navigate(selected);
  };

  const handleLogOut = ()=>{
    localStorage.removeItem("authToken");
    navigate("/admin/login");
  }

  return (
    <div className="bg-[#24001D] px-[24px] max-w-[304px] min-h-[100vh] h-[100%] flex flex-col items-center overflow-scroll pb-[33px]">
      <div className="mt-[38px]">
        <img src="/images/logo-w.svg" alt="" className="w-[85px]" />
      </div>
      <div className="mt-[24px] w-[100%] flex flex-col gap-[10px]">
        {NAVOPTIONS.map((item) => (
          <button key={item.text} onClick={() => handleSwitchTab(item.path)}>
            <Navtab text={item.text} icon={item.icon} active={item.path} />
          </button>
        ))}
      </div>
      
      <div className="mt-[50px] w-[100%]">
        <Navtab
          onClick={handleLogOut}
          text="Logout"
          icon={"/images/sidebar/logout.svg"}
          active={"Dashboard"}
          className={"bg-[#FEEAEA] text-[#980E0E] justify-center cursor-pointer"}
        />
      </div>
    </div>
  );
}

export default Sidebar;
