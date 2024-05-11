import React from "react";

function SelectCategory() {
  return (
    <div className="px-[35px] mt-[20px]">
      <h1 className="text-[1.5rem]">Select Category from the List Below</h1>
      <form>
        <div className="mt-[23px]">
          <p className="text-[0.875rem]">Category</p>
          <select
            className="outline-0 border-[1px] bg-[#F8F8F8] w-[100%] h-[56px] rounded-[8px] px-[16px] mt-[16px]"
            placeholder="e.g. Username"
          >
            <option value="">Select Category</option>
          </select>
        </div>
        <button
          className="outline-0 border-[1px] bg-[#242424] w-[100%] h-[56px] rounded-[8px] px-[16px] mt-[16px]"
          placeholder="e.g. Username"
        >
          <p className="font-[500] text-[#ffffff]">Select Category</p>
        </button>
      </form>

      <div className="mt-[40px]">
        <h1 className="text-[1.5rem]"> Category on List Above</h1>

        <h2 className="text-[1.2rem]"> Create Category</h2>
        <form>
          <div className="mt-[23px]">
            <p className="text-[0.875rem]">Category</p>
            <input
              className="outline-0 border-[1px] bg-[#F8F8F8] w-[100%] h-[56px] rounded-[8px] px-[16px] mt-[16px]"
              placeholder="e.g. gown"
            />
          </div>
          <button
            className="outline-0 border-[1px] bg-[#242424] w-[100%] h-[56px] rounded-[8px] px-[16px] mt-[16px]"
            placeholder="e.g. Username"
          >
            <p className="font-[500] text-[#ffffff]">Add Category</p>
          </button>
        </form>
      </div>
    </div>
  );
}

export default SelectCategory;
