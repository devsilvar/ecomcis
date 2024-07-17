import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import ClipLoader from "react-spinners/ClipLoader";

import { useSelector, useDispatch } from "react-redux";

import { logIn } from "../store/features/auth/loginInFeature";


function Registration() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  const loginState = useSelector((state) => state.logIn);

  const { loading } = loginState;

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const payload = {
    username: email,
    password: password,
  };

  const handleLogin =(e)=>{
    e.preventDefault();

    dispatch(logIn(payload))
  }


  return (
    <div
    className="h-[100vh] w-[100vw] bg-no-repeat bg-cover bg-center lg:p-[46px] p-[16px]"
    style={{
      backgroundImage: "url('/images/home/img2.png')",
    }}
    >
    <ToastContainer />
      <Link to="/">
        <img src="/images/logo.svg" alt="" />
      </Link>
      <div className="lg:absolute right-[100px]  top-[150px]">
        <div className="bg-[#ffffff] lg:w-[585px] w-[100%] lg:px-[32px] px-[10px] py-[47px] rounded-[16px]">
          <p className="text-[3rem] font-[700]">Sign in</p>
          <div className="flex">
            <p>Are you are a new user? </p> &nbsp;
            <Link to="/create-account"> <b><u>Create Account</u></b></Link>
          </div>

          <form className="flex flex-col gap-[16px] mt-[24px]">
            <div className="flex flex-col gap-[16px]">
              <p className="text-[0.875rem]">Email address</p>
              <input
                value={email}
                type="email"
                onChange={handleEmailChange}
                className="bg-[#F8F8F8] rounded-[8px] h-[56px] px-[16px] w-[100%]"
              />
            </div>
            <div className="flex flex-col gap-[16px]">
              <p className="text-[0.875rem]">Password</p>
              <input
                value={password}
                type="password"
                onChange={handlePasswordChange}
                className="bg-[#F8F8F8] rounded-[8px] h-[56px] px-[16px] w-[100%]"
              />
            </div>
            <div>
              <p>Forgot Password?</p>
            </div>
            <button 
                onClick={handleLogin}
                className="bg-[#242424] w-[100%] h-[56px] rounded-[8px] px-[16px] text-[#ffffff]">
                  {loading ? <ClipLoader
                                  size={20}
                                  aria-label="Loading Spinner"
                                  data-testid="loader"
                                  color="#ffffff"
                                />: "Log In"}
            </button>
            <hr className="w-[50%] mx-[auto]" />
          </form>
        </div>
      </div>
    </div>
  );
}

export default Registration;
