import React, {useState, useEffect} from "react";
import ProductCard from "../../components/common/ProductCard";
import { useCurrency } from "../../utils/CurrencyProvider";
import { formatMoney } from "../../utils/nairaFormat";
import Wishlist from "../../components/common/Wishlist";



function SavedItems() {
  const [savedProduct, setSavedProduct] = useState([]);
  const { currency, conversionRate } = useCurrency();
  const [showWishList, setShowWishList] = useState(false)
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
    <div className="w-[100%] border-[1px] max-w-[953px] p-[16px] h-[645px] overflow-scroll flex flex-col gap-[24px]">
      <Wishlist showWishList={showWishList} setShowWishList={setShowWishList} />
      <div className="flex justify-between">
        <p>WISHLIST</p>
        <button onClick={() => setShowWishList(true)} className="bg-[#F2F2F2] px-[22px] py-[8px]">EDIT</button>
      </div>
      <div className="flex gap-[6px] lg:max-w-[762px] w-[100%] flex-wrap">
        {savedProduct.map((item, index) => (
          <ProductCard
            image={item?.images[0]}
            price={formatMoney(item?.price, currency, conversionRate)}
            title={item?.name}
          />
        ))}
      </div>
    </div>
  );
}

export default SavedItems;
