import React from "react";
import { Link } from "react-router-dom";

function Categories({ categories }) {
  return (
    <div className="absolute top-[100px] w-[100%] h-[300px] z-[10] border-[1px] bg-[#ffffff] px-[52px] py-[12px] flex justify-between items-center">
      
      <div className="ml-[20px] h-[100%] w-[800px] flex flex-col flex-wrap gap-[24px]">
        {categories &&
          categories.map((category) => (
            <p key={category.id} value={category.id} className="text-[#000000] text-[16px] hover:text-[#D45C7B] hover:text-blue-600">
              <Link to={'/all-products?category='+category.name}>{category.name}</Link>
            </p>
          ))}
      </div>
      <div>
        <img className="w-[200px]" src="/images/product/img1.png" alt="filter" />
      </div>
    </div>
  );
}

export default Categories;
