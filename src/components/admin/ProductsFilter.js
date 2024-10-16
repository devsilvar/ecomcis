import React, { useState } from "react";
import { LuSearch } from "react-icons/lu";
import { RiArrowDropDownLine } from "react-icons/ri";

function ProductsFilter() {
  const [ search, setSearch ] = useState("");
  
  const handleSearch = (e) => {
    setSearch(e.target.value);
  }
  return (
    <div className="bg-[#ffffff] w-[100%] py-[21px] my-[24px] rounded-[8px] px-[12px] flex justify-between">
      <div className="flex gap-[8px] w-[60%] px-[8px] items-center h-[48px] rounded-[8px] border-[1px]">
        <LuSearch />
        <input
          type="text"
          value={search}
          onChange={handleSearch}
          placeholder="Search for products"
          className="w-[100%] outline-0"
        />
      </div>

      <div className="flex">
        <div className="flex px-[10px] w-[160px] h-[44px] justify-between items-center border-[1px] rounded-[8px] ml-[16px] mb-[16px]">
          <p>Search All</p>
          <RiArrowDropDownLine className="text-[25px]" />
        </div>
        <div className="flex px-[10px] w-[160px] h-[44px] justify-between items-center border-[1px] rounded-[8px] ml-[16px] mb-[16px]">
          <p>Filter All</p>
          <RiArrowDropDownLine className="text-[25px]" />
        </div>
      </div>
    </div>
  );
}

export default ProductsFilter;
