import React from "react";
import Input from "../../components/admin/form/Input";

function Login() {
  return (
    <div className="mt-[100px] admin">
      <img src="/images/logo.svg" alt="" className="mx-auto" />

      <div className="w-[678px] mx-auto p-[54px] border-[1px] border-[#E0E0E0] mt-[46px] rounded-[16px]">
        <form className="flex flex-col gap-[17px]">
          <Input
            topText="Username / Email address"
            placeholder="e.g. Username"
          />
          <Input topText="Password" placeholder="*******" />
          <button className="h-[46px] rounded-[8px] bg-[#242424] px-[25px]">
            <p className="text-[#fff]">Login</p>
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
