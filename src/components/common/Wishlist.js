import React, { useState, useEffect } from "react";
import { IoBagOutline } from "react-icons/io5";
import { Link } from "react-router-dom";

function Wishlist() {
  const [savedProduct, setSavedProduct] = useState([]); // Initialize with an empty array

  useEffect(() => {
    // Load the saved product from sessionStorage when the component mounts
    const savedItem = sessionStorage.getItem('savedItem');
    if (savedItem) {
      setSavedProduct(JSON.parse(savedItem));
    }

    // Listen for the custom storageChange event
    const handleStorageChange = () => {
      const updatedSavedItem = sessionStorage.getItem('savedItem');
      if (updatedSavedItem) {
        setSavedProduct(JSON.parse(updatedSavedItem));
      }
    };

    window.addEventListener('storageChange', handleStorageChange);

    return () => {
      window.removeEventListener('storageChange', handleStorageChange);
    };
  }, []);

  return (
    <div className="absolute top-[80px] z-[10] border-[1px] right-[440px] w-[622px] h-[255px] bg-[#ffffff]">
      {
        savedProduct.length > 0 ? (
          <div className="flex flex-wrap gap-2 p-5">
            {savedProduct?.map((item) => (
              <Link to={`/product/${item?.id}`} key={item?.id}>
                <div className="w-[100px]">
                  <img src={item?.images[0]} alt="product_image" />
                  <p>{item?.name}</p>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="text-center flex flex-col items-center justify-center my-[44px]">
            <IoBagOutline className="text-[2rem]" />
            <p>Your bag is empty !!</p>
            <p>Check our beautiful collections </p>
            <button className="border-[1px] mt-[24px] py-[10px] px-[20px] rounded-[8px]">
              START SHOPPING
            </button>
          </div>
        )
      }
    </div>
  );
}

export default Wishlist;
