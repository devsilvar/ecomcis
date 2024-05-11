import React, { useState } from "react";
import clsx from "clsx";
import { FaArrowLeft } from "react-icons/fa6";
import AddProduct from "../form/AddProduct";
import SelectCategory from "../form/SelectCategory";

function AddProductDrawer({ showCart, setShowCart }) {
  const [showCategory, setShowCategory] = useState(false);
  return (
    <div
      className={clsx(
        "fixed  right-0 left-0 top-0 bottom-0 bg-[#0000003D] z-[100] overflow-scroll duration-300 ease-in-out",
        showCart ? "" : "translate-x-[100vw]"
      )}
    >
      {showCategory && (
        <div className="ml-[auto] pb-[50px] lg:w-[622px]  min-h-[100vh] bg-[#ffffff]">
          <div className="flex items-center bg-[#F8F8F8] h-[103px] px-[35px] gap-[13px]">
            <FaArrowLeft
              className="cursor-pointer"
              onClick={() => {
                setShowCategory(false);
              }}
            />
            <p className="text-[1.5rem]">Add Category</p>
          </div>
          <SelectCategory />
        </div>
      )}
      <div
        className={clsx(
          "ml-[auto] pb-[50px] lg:w-[622px]  min-h-[100vh] bg-[#ffffff]",
          showCategory ? "hidden" : ""
        )}
      >
        <div className="flex items-center bg-[#F8F8F8] h-[103px] px-[35px] gap-[13px]">
          <FaArrowLeft
            className="cursor-pointer"
            onClick={() => {
              setShowCart(false);
            }}
          />
          <p className="text-[1.5rem]">Add a Product</p>
        </div>
        <AddProduct setShowCategory={setShowCategory} />
      </div>
    </div>
  );
}

export default AddProductDrawer;
