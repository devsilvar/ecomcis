import { Drawer } from "antd";
import React from "react";
import { FaArrowLeft, FaEdit } from "react-icons/fa";
import { IoTrash } from "react-icons/io5";

function EditProductDrawer({ open, setOpen }) {
  const onClose = () => {
    setOpen(false);
  };

  return (
    <Drawer
      placement="right"
      closable={false}
      onClose={onClose}
      open={open}
      key={"right"}
      className="z-[100] w-[720px] m-0 p-[0px]"
    >
      <div className="w-[720px]"></div>
      <div className="h-[120px] bg-[#F8F8F8]">
        <div className="flex justify-between">
          <div className="flex items-center bg-[#F8F8F8] h-[103px] px-[35px] gap-[13px]">
            <FaArrowLeft
              className="cursor-pointer"
              onClick={() => {
                setOpen(false);
              }}
            />
            <p className="text-[1.5rem] text-[#333333]">BIKINI SHORT GOWN</p>
          </div>{" "}
          <div className="flex items-center bg-[#F8F8F8] h-[103px] px-[35px] gap-[13px]">
            <FaEdit
              className="cursor-pointer text-[30px] text-[#333333]"
              onClick={() => {
                setOpen(false);
              }}
            />
            <IoTrash
              className="cursor-pointer text-[30px] text-[#DE1717]"
              onClick={() => {
                setOpen(false);
              }}
            />
          </div>
        </div>
      </div>
    </Drawer>
  );
}

export default EditProductDrawer;
