import React, { useEffect, useState } from "react";

import ClipLoader from "react-spinners/ClipLoader";

function SelectCategory({ loading, isLoading, isError, allCategories }) {
  return (
    <div className=" mt-[20px]">
      <h1 className="text-[1.5rem]">Select Category from the List Below</h1>

      <div className="mt-[23px]">
        <p className="text-[0.875rem]">Category</p>
        <select
          name="category"
          className="outline-0 border-[1px] bg-[#F8F8F8] w-[100%] h-[56px] rounded-[8px] px-[16px] mt-[16px]"
          placeholder="e.g. Username"
        >
          {isLoading ? (
            <option>Loading...</option>
          ) : isError ? (
            <option>Error Loading categories</option>
          ) : (
            allCategories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))
          )}
        </select>
      </div>

      <button
        className="outline-0 border-[1px] bg-[#242424] w-[100%] h-[56px] rounded-[8px] px-[16px] mt-[16px]"
        placeholder="e.g. Username"
      >
        {loading ? (
          <ClipLoader
            size={20}
            aria-label="Loading Spinner"
            data-testid="loader"
            color="#ffffff"
          />
        ) : (
          <p className="font-[500] text-[#ffffff]">Select Category</p>
        )}
      </button>
    </div>
  );
}

export default SelectCategory;
