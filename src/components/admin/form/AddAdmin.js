import React from "react";

function AddAdmin() {
  return (
    <div className="px-[35px]">
      <form
        enctype="multipart/form-data"
        onSubmit={(e) => {
          e.preventDefault();
        }}
      >
        <div>
          <div className="mt-[23px]">
            <p className="text-[0.875rem]">Name</p>
            <input
              className="outline-0 border-[1px] bg-[#F8F8F8] w-[100%] h-[56px] rounded-[8px] px-[16px] mt-[16px]"
              placeholder="e.g. Username"
            />
          </div>
          <div className="mt-[23px]">
            <p className="text-[0.875rem]">Email Address</p>
            <input
              className="outline-0 border-[1px] bg-[#F8F8F8] w-[100%] h-[56px] rounded-[8px] px-[16px] mt-[16px]"
              placeholder="e.g. Username"
            />
          </div>
          <div className="mt-[23px]">
            <p className="text-[0.875rem]">Phone Number</p>
            <input
              className="outline-0 border-[1px] bg-[#F8F8F8] w-[100%] h-[56px] rounded-[8px] px-[16px] mt-[16px]"
              placeholder="e.g. Username"
            />
          </div>
          <div className="mt-[23px]">
            <p className="text-[0.875rem]">Password</p>
            <input
              className="outline-0 border-[1px] bg-[#F8F8F8] w-[100%] h-[56px] rounded-[8px] px-[16px] mt-[16px]"
              placeholder="e.g. Username"
            />
          </div>

          <div className="mt-[23px]">
            <button
              className="outline-0 border-[1px] bg-[#242424] w-[100%] h-[56px] rounded-[8px] px-[16px] mt-[16px]"
              placeholder="e.g. Username"
            >
              <p className="font-[500] text-[#ffffff]">invite Admin</p>
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default AddAdmin;
