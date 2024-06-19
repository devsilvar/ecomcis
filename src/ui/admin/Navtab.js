import clsx from "clsx";
import React from "react";
import { useLocation } from "react-router-dom";

function Navtab({ text, icon, active, className, onClick }) {
  const location = useLocation();
  const { pathname } = location;

  return (
    <div
      onClick={onClick}
      className={clsx(
        "flex items-center gap-[16px] py-[16px] px-[24px] rounded-[8px] w-[100%] ",
        active === pathname ? "bg-[gray]" : "",
        className ? className : "text-[#ffffff]"
      )}
    >
      <img src={icon} alt="" className="w-[24px] h-[24px]" />

      <p className="text-[1rem] font-[400]">{text}</p>
    </div>
  );
}

export default Navtab;
