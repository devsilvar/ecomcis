import React from "react";
import Input from "./Input";

function SecurityForm() {
  return (
    <div>
      <p className="text-center mt-[32px]">Security Settings</p>
      <form className="flex flex-col gap-[17px] mt-[46px]">
        <Input topText="Old Password" />
        <Input topText="New Password" />
        <Input topText="Confirm Password" />

        <button className="h-[46px] rounded-[8px] bg-[#242424] px-[25px]">
          <p className="text-[#fff]">Update Changes</p>
        </button>
      </form>
    </div>
  );
}

export default SecurityForm;
