import React from "react";
import clsx from "clsx";
import AddProduct from "../form/AddProduct";


function AddProductDrawer({ showCart }) {
  return (
    <div 
        className={clsx(
            "w-2/5 fixed right-0 top-0 bottom-0 p-10 bg-[#F8F8F8] z-[100] overflow-scroll duration-300 ease-in-out",
            showCart ? "" : "translate-x-[100vw]"
          )}>
        <AddProduct/>
    </div>
  );
}

export default AddProductDrawer;
