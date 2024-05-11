import React from "react";
import { RiImageEditFill } from "react-icons/ri";
import Input from "./Input";

function BusinessInfoForm() {
  return (
    <div>
      <p className="text-center mt-[32px]">BUSINESS PROFILE</p>
      <div className="mt-[42px] justify-center items-center flex gap-[26px]">
        <img src="/images/logo.png" alt="" className="h-[120px] w-[120px]" />
        <button className="h-[46px] rounded-[8px] bg-[#242424] px-[25px] flex gap-[17px] justify-center items-center">
          <RiImageEditFill className="text-[#fff]" />
          <p className="text-[#fff]">Change Logo</p>
        </button>
      </div>
      <form className="flex flex-col gap-[17px] mt-[46px]">
        <Input topText="Business Name" placeholder="Enter Business Name" />
        <Input topText="Email Address" placeholder="Enter Email Address" />
        <Input
          topText="Telephone number"
          placeholder="Enter Telephone number"
        />
        <Input topText="Location" placeholder="Enter Location" />
        <button className="h-[46px] rounded-[8px] bg-[#242424] px-[25px]">
          <p className="text-[#fff]">Update Changes</p>
        </button>
      </form>
    </div>
  );
}

export default BusinessInfoForm;
