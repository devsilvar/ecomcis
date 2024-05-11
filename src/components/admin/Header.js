import React from "react";
import { LuSearch } from "react-icons/lu";
import { GoBell } from "react-icons/go";
import { IoSettingsOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";

function Header() {
  const navigate = useNavigate();
  return (
    <div className="bg-[#ffffff]  w-[100%] px-[24px]">
      <div className="max-w-[1090px] flex justify-between items-center h-[88px] mx-auto">
        <div className="flex gap-[8px] w-[308px] px-[8px] items-center h-[48px] rounded-[8px] border-[1px]">
          <LuSearch />
          <input
            placeholder="Search for product, customers"
            className="w-[100%] outline-0"
          />
        </div>

        <div className="flex gap-[8px]">
          <div className="p-[12px] rounded-[16px] border-[1px]">
            <GoBell />
          </div>

          <div className="border-[1px] rounded-[8px] w-[180px] h-[48px] flex items-center px-[16px] justify-between">
            <div className="w-[32px] h-[32px] rounded-[50%] bg-[#E0E0E0]"></div>
            <p>SAMMY</p>
            <IoSettingsOutline
              className="text-[25px] cursor-pointer"
              onClick={() => {
                navigate("/admin/settings");
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Header;
