import clsx from "clsx";
import { Link } from "react-router-dom";
import { IoBagOutline } from "react-icons/io5";
import React, { useState, useEffect } from "react";
import { formatMoney } from "../../utils/nairaFormat";
import { useCurrency } from "../../utils/CurrencyProvider";

function Wishlist({ showWishList, setShowWishList }) {
  const [savedProduct, setSavedProduct] = useState([]); // Initialize with an empty array

  const { currency, conversionRate } = useCurrency();
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

  const handleRemoveFromWishlist = (index) => {
    let savedItem = sessionStorage.getItem('savedItem');
    if (savedItem) {
      let savedProducts = JSON.parse(savedItem);
      // Remove the item based on its index
      savedProducts.splice(index, 1);
      sessionStorage.setItem('savedItem', JSON.stringify(savedProducts));

      // Trigger storage event to update the UI
      window.dispatchEvent(new Event('storageChange'));
    }
  };

  return (
    <div
      className={clsx(
        "fixed right-0 left-0 top-0 h-[100vh] overflow-scroll bottom-0 bg-[#0000003D] z-[100] overflow-scroll duration-500 ease-in-out",
        showWishList ? "block" : "translate-x-[100vw] hidden"
      )}
    >
      <div className="w-[calc(100vw - 622px)] h-[100vh] cursor-pointer" onClick={() => {setShowWishList(false)}}></div>
      <div className="ml-[auto] fixed right-0 top-0 bottom-0 pb-[50px] lg:w-[622px] overflow-scroll h-[100vh] bg-[#ffffff] pt-[32px] px-[32px]">
        
      <div className="flex justify-between items-center">
          <p className="text-[2rem] text-[#4E0240] lg:text[1em]">SAVED ITEMS ({savedProduct?.length})</p>
          <div
            className="cursor-pointer w-[20px]"
            onClick={() => {
              setShowWishList(false);
            }}
          >
            <img src="/images/x.svg"  alt="close" />
          </div>
      </div>

        {
          savedProduct.length > 0 ? (
            <div className="flex flex-wrap gap-5 p-5">
              {savedProduct.map((item, index) => (
                <div key={item?.id} className="relative">
                  <button className="absolute top-[-10px] right-[-10px] w-[15px] h-[15px] rounded-[50%] bg-[#f00] text-[#fff] flex justify-center items-center p-3" onClick={() => handleRemoveFromWishlist(index)}>X</button>
                  <Link to={`/product/${item?.id}`} key={item?.id}>
                    <div className="w-[100px]">
                      <img src={item?.images[0]} alt="product_image" />
                      <p className="text-[bold]">{item?.name}</p>
                      <div className="flex justify-between">
                        <p>{formatMoney(item?.price, currency, conversionRate)}</p>
                      </div>
                    </div>
                  </Link>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center flex flex-col items-center justify-center my-[44px]">
              <IoBagOutline className="text-[2rem]" />
              <p>Your bag is empty !!</p>
              <p>Check our beautiful collections </p>
              <Link to="/all-products" className="border-[1px] mt-[24px] py-[10px] px-[20px] rounded-[8px]">
                START SHOPPING
              </Link>
            </div>
          )
        }
      </div>
    </div>
  );
}

export default Wishlist;
