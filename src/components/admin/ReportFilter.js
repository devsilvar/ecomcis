import React from "react";
import { LuSearch } from "react-icons/lu";
import { RiArrowDropDownLine } from "react-icons/ri";
import { IoShareSocialOutline } from "react-icons/io5";

function ReportFilter() {
  return (
    <div>
      <div className="bg-[#ffffff] w-[100%] py-[21px] my-[24px] rounded-[8px] px-[12px] flex gap-[17px] flex-wrap items-end">
        <div className="w-[calc((100%/3)-17px)]">
          <p className="text-[#828282]">From Date</p>
          <div className="flex gap-[8px] w-[100%] px-[8px] items-center h-[48px] rounded-[8px] border-[1px]">
            <input
              placeholder="Search by ID"
              type="date"
              className="w-[100%] outline-0 text-[#828282]"
            />
          </div>
        </div>

        <div className="w-[calc((100%/3)-17px)]">
          <p className="text-[#828282]">To Date</p>
          <div className="flex gap-[8px] w-[100%] px-[8px] items-center h-[48px] rounded-[8px] border-[1px]">
            <input
              placeholder="Search by ID"
              type="date"
              className="w-[100%] outline-0 text-[#828282]"
            />
          </div>
        </div>

        <div className="w-[calc((100%/3)-17px)]">
          <p className="text-[#828282]">Type</p>
          <div className="flex gap-[8px] w-[100%] px-[8px] items-center h-[48px] rounded-[8px] border-[1px]">
            <input
              placeholder="Search by ID"
              type="test"
              className="w-[100%] outline-0 text-[#828282]"
            />
          </div>
        </div>

        <div className="w-[calc((100%/3)-17px)]">
          <p className="text-[#828282]">status</p>
          <div className="flex gap-[8px] w-[100%] px-[8px] items-center h-[48px] rounded-[8px] border-[1px]">
            <input
              placeholder="Search by ID"
              type="date"
              className="w-[100%] outline-0 text-[#828282]"
            />
          </div>
        </div>
        <div className="w-[calc((100%/3)-17px)]">
          <div className="flex gap-[8px] w-[100%]  items-center h-[48px] rounded-[8px] border-[1px] overflow-hidden">
            <input
              value="Apply Filter"
              type="submit"
              className="w-[100%] outline-0 text-[#828282] bg-[#242424] h-[100%]"
            />
          </div>
        </div>
      </div>

      <div className=" w-[100%] rounded-[8px]  flex justify-between">
        <div className="flex gap-[8px] w-[60%] px-[8px] items-center h-[48px] rounded-[8px] border-[1px] bg-[#ffffff]">
          <LuSearch />
          <input placeholder="Search by ID" className="w-[100%] outline-0" />
        </div>

        <div className="flex">
          <div className="flex px-[10px] w-[160px] h-[44px] justify-between items-center border-[1px] rounded-[8px] ml-[16px] mb-[16px] bg-[#ffffff]">
            <p>Sort By</p>
            <RiArrowDropDownLine className="text-[25px]" />
          </div>
          <div className="flex px-[10px] w-[160px] h-[44px] justify-between items-center border-[1px] rounded-[8px] ml-[16px] mb-[16px] bg-[#ffffff]">
            <IoShareSocialOutline className="text-[1.3rem]" />

            <p>Export Sheet</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ReportFilter;
