import clsx from "clsx";
import React from "react";
import { FaArrowLeft } from "react-icons/fa";
import AddAdmin from "../form/AddAdmin";

function AddAdminDrawer({ setShowDrawer, showAdminDrawer }) {
  return (
    <div
      className={clsx(
        "fixed  right-0 left-0 top-0 bottom-0 bg-[#0000003D] z-[100] overflow-scroll duration-300 ease-in-out",
        showAdminDrawer ? "" : "translate-x-[100vw]"
      )}
    >
      <div className="ml-[auto] pb-[50px] lg:w-[622px]  min-h-[100vh] bg-[#ffffff]">
        <div className="flex items-center bg-[#F8F8F8] h-[103px] px-[35px] gap-[13px]">
          <FaArrowLeft
            className="cursor-pointer"
            onClick={() => {
              setShowDrawer(false);
            }}
          />
          <p className="text-[1.5rem]">Add an Admin</p>
        </div>
        <AddAdmin />
      </div>
    </div>
  );
}

export default AddAdminDrawer;
