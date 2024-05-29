import React from "react";
import { Link } from "react-router-dom";

function CreateAccount() {
  return (
    <div className="flex min-h-[100vh]">
      <div className="lg:w-[50%] w-[100%] flex flex-col items-center justify-center px-[24px]">
        <Link to="/">
          <img src="/images/logo.svg" alt="" />
        </Link>
        <p className="text-[3rem] font-[700]">Create Account</p>
        <div className="flex">
          <p>Register your account and shopping clothes</p>
        </div>
        <form className="flex flex-col gap-[16px] mt-[24px] lg:w-[500px] w-[100%]">
          <div className="flex flex-col gap-[16px]">
            <p className="text-[0.875rem]">First Name</p>
            <input
              type="text"
              className="bg-[#F8F8F8] rounded-[8px] h-[56px] px-[16px] w-[100%]"
            />
          </div>
          <div className="flex flex-col gap-[16px]">
            <p className="text-[0.875rem]">Last Name</p>
            <input
              type="text"
              className="bg-[#F8F8F8] rounded-[8px] h-[56px] px-[16px] w-[100%]"
            />
          </div>
          <div className="flex flex-col gap-[16px]">
            <p className="text-[0.875rem]">Email Address</p>
            <input
              type="text"
              className="bg-[#F8F8F8] rounded-[8px] h-[56px] px-[16px] w-[100%]"
            />
          </div>
          <div className="flex flex-col gap-[16px]">
            <p className="text-[0.875rem]">Password</p>
            <input
              type="password"
              className="bg-[#F8F8F8] rounded-[8px] h-[56px] px-[16px] w-[100%]"
            />
            <p>Password should be at least 8 characters</p>
          </div>

          <div className="flex gap-[10px]">
            <input type="checkbox" name="" />
            <p>Accept our Term of Use and Condition</p>
          </div>

          <button className="bg-[#242424] w-[100%] h-[56px] rounded-[8px] px-[16px] text-[#ffffff]">
            Create Account
          </button>
          <hr className="w-[50%] mx-[auto]" />
        </form>
      </div>
      <div
        className="w-[50%] hidden lg:block bg-no-repeat bg-cover bg-top "
        style={{
          backgroundImage: "url('/images/home/img4.png')",
        }}
      ></div>
    </div>
  );
}

export default CreateAccount;
