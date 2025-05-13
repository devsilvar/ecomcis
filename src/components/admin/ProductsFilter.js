import React, { useState, useEffect } from "react";
import { LuSearch } from "react-icons/lu";
import { FaSearch } from "react-icons/fa";
// import { useSelector } from "react-redux";


function ProductsFilter({ search, setSearch, selectedCategory, setSelectedCategory, categoryOptions }) {


  return (
    <div className="bg-white w-full py-5 my-6 rounded-lg px-3 flex flex-col md:flex-row justify-between gap-4">
      {/* Search Input */}
      <div className="flex items-center gap-2 w-full md:w-2/3 border px-3 h-12 rounded-md">
        <LuSearch />
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search for products"
          className="w-full outline-none"
        />
      </div>

      {/* Category Dropdown */}
      <div className="relative flex items-center gap-3 w-1/3">
        <select
          onChange={(e) => setSelectedCategory(e.target.value)}
          value={selectedCategory}
          className="w-full h-11 px-3 border rounded-md"
        >
          <option value="">All Categories</option>
          {categoryOptions?.map((cat, idx) => (
            <option key={idx} value={cat.id}>{cat.name}</option>
          ))}
        </select>
      </div>
    </div>
  );
}

export default ProductsFilter;
