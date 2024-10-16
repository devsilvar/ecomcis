import React, {useState} from "react";
import { Link } from "react-router-dom";
import { IoMdHeartEmpty } from "react-icons/io";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";

function ProductCard({ id, image, title, brand, price }) {
  const {data} = useSelector((state) => state.listProduct);

  const handleSavedProduct = (id) => {
      let savedItem = localStorage.getItem('savedItem');
      if (!savedItem) {
          savedItem = [];
        } else {
          savedItem = JSON.parse(savedItem);
        }
        const product = data.find((item) => item.id === id);
        const isProductSaved = savedItem.some((item) => item.id === product.id);

        if (isProductSaved){
          toast.info("Product already saved");
          return
        }else{
          // Add the product to the array
          savedItem.push(product);
          localStorage.setItem('savedItem', JSON.stringify(savedItem));
          toast.success("Product saved for later");
          window.dispatchEvent(new Event("storageChange"));
        }
  }
  
  return (
    <div className="lg:w-[375px] w-[100%] pb-[30px]">
        <Link to={`/product/${id}`}>
          <img 
            src={image} 
            className="w-[100%] lg:h-[460px]" 
            alt="" />
        </Link>
        <div className="flex justify-between items-center mt-[16px]">
          
          <div className="flex flex-col gap-[8px] ">
            <p className="text-[1.5rem]">{title}</p>
            <p className="text-[1.25rem]">{brand}</p>
            <p className="text-[1.25rem]">{price}</p>
          </div>

          <button onClick={()=> handleSavedProduct(id)} className="border-[#4E0240] hover:bg-[#4E0240] hover:text-[#fff] border text-[#4E0240] text-[1rem] py-[10px] px-[10px] rounded-[10px] cursor-pointer">
            <IoMdHeartEmpty />
          </button>
        </div>
      </div>
  );
}

export default ProductCard;
