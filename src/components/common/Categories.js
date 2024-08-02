import React from "react";
import { Link } from "react-router-dom";

function Categories({ categories }) {
  return (
    <div className="absolute top-[120px] z-[10] border-[1px] left-[440px] bg-[#ffffff] px-[52px] py-[12px] flex">
      
      <div className="ml-[20px] flex flex-col flex-wrap gap-[24px]">
        {categories &&
          categories.map((category) => (
            <p key={category.id} value={category.id}>
              <Link to={'/all-products?category='+category.name}>{category.name}</Link>
            </p>
          ))}
      </div>
    </div>
  );
}

export default Categories;
