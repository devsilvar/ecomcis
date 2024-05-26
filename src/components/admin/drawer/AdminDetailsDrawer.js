import clsx from "clsx";
import React from "react";
import { FaArrowLeft, FaTrash } from "react-icons/fa";
import AddAdmin from "../form/AddAdmin";

function AdminDetailsDrawer({
  setShowAdminDetailsDrawer,
  showAdminDetailsDrawer,
}) {
  return (
    <div
      className={clsx(
        "fixed  right-0 left-0 top-0 bottom-0 bg-[#0000003D] z-[100] overflow-scroll duration-300 ease-in-out",
        showAdminDetailsDrawer ? "" : "translate-x-[100vw]"
      )}
    >
      <div className="ml-[auto] pb-[50px] lg:w-[622px]  min-h-[100vh] bg-[#ffffff]">
        <div className="flex items-center justify-between bg-[#F8F8F8] h-[103px] px-[35px] ">
          <div className="flex items-center gap-[13px]">
            <FaArrowLeft
              className="cursor-pointer"
              onClick={() => {
                setShowAdminDetailsDrawer(false);
              }}
            />
            <p className="text-[1.5rem]">Admin Details</p>
          </div>
          {/* <FaTrash className="text-[#DE1717]" /> */}
        </div>
        <div className="mt-[54px] ml-[34px]">
          <div className="flex flex-col gap-[24px]">
            <div>
              <p className="text-[400] text-[#828282] text-[1rem]">Name</p>
              <p className="text-[1.25rem]">Aisha Aliyu</p>
            </div>
            <div>
              <p className="text-[400] text-[#828282] text-[1rem]">Role</p>
              <p className="text-[1.25rem]">Member</p>
            </div>
            <div>
              <p className="text-[400] text-[#828282] text-[1rem]">
                Date joined
              </p>
              <p className="text-[1.25rem]">12-06-2023</p>
            </div>
            <div>
              <p className="text-[400] text-[#828282] text-[1rem]">Status</p>
              <p className="text-[1.25rem]">Active admin</p>
            </div>
            <div>
              <p className="text-[400] text-[#828282] text-[1rem]">last seen</p>
              <p className="text-[1.25rem] text-[#008000]">Online</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminDetailsDrawer;
