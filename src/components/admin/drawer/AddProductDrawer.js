import React, { useEffect, useRef, useState } from "react";
import clsx from "clsx";
import { FaArrowLeft } from "react-icons/fa6";
import AddProduct from "../form/AddProduct";
import SelectCategory from "../form/SelectCategory";
import AddVariation from "../form/AddVariation";

import { toast } from "react-toastify";

import { useDispatch, useSelector } from "react-redux";


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
