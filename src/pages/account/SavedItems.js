import React from "react";
import ProductCard from "../../components/common/ProductCard";
const savedItems = [
  { image: "/images/home/img1.png", price: 90000, title: "Gown" },
];
function SavedItems() {
  return (
    <div className="w-[100%] border-[1px] max-w-[953px] p-[16px] h-[645px] overflow-scroll flex flex-col gap-[24px]">
      <div className="flex justify-between">
        <p>WISHLIST</p>
        <button className="bg-[#F2F2F2] px-[22px] py-[8px]">EDIT</button>
      </div>
      <div className="flex gap-[6px] lg:max-w-[762px] w-[100%] flex-wrap">
        {savedItems.map((item) => (
          <ProductCard
            image={item.image}
            price={item.price}
            title={item.title}
          />
        ))}
      </div>
    </div>
  );
}

export default SavedItems;
