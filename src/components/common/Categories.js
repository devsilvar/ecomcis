import React from "react";

function Categories({ categories }) {
  return (
    <div className="absolute top-[80px] z-[10] border-[1px] left-[440px] h-[555px] bg-[#ffffff] px-[52px] py-[42px] flex">
      <div>
        <img src="/images/home/img2.png" className="w-[370px]" alt="" />
      </div>
      <div className="ml-[20px] h-[300px] flex flex-col flex-wrap gap-[24px]">
        {categories &&
          categories.map((category) => (
            <p key={category.id} value={category.id}>
              {category.name}
            </p>
          ))}
      </div>
    </div>
  );
}

export default Categories;
