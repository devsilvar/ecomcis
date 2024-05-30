import React from "react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useSignUpMutation } from "../services/authApi";
import { toast, ToastContainer } from "react-toastify";

function CreateAccount() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  
  const [signUp, { isLoading }] = useSignUpMutation();
  const notify = (msg) => toast(msg);

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };
  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };
  const handleFullNameChange = (e) => {
    setFullName(e.target.value);
  };
  const handlePhoneNumberChange = (e) => {
    setPhoneNumber(e.target.value);
  };

  const handleSignUp = (e) => {
    e.preventDefault();
    signUp({
      email: email,
      password: password,
      full_name: fullName,
      mobile: phoneNumber,
    })
    .then((res)=>{
      if (res.error) {

        for (const [field, messages] of Object.entries(res.error.data)) {
          if (Array.isArray(messages)) {
              // Handle array of error messages
              messages.forEach(message => {
                  notify(`${field}: ${message}`);
              });
          } else if (typeof messages === 'string') {
              // Handle single error message string
              notify(`${field}: ${messages}`);
          }
      }
        console.log(res.error);
      }else{
        notify("Sign up successful");
          window.location.href = "/register";
      }
    })
  }

  return (

    <div className="flex min-h-[100vh]">
      <ToastContainer/>
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
            <p className="text-[0.875rem]">Full Name</p>
            <input
              type="text"
              value={fullName}
              onChange={handleFullNameChange}
              className="bg-[#F8F8F8] rounded-[8px] h-[56px] px-[16px] w-[100%]"
            />
          </div>
          <div className="flex flex-col gap-[16px]">
            <p className="text-[0.875rem]">Phone Number</p>
            <input
              type="tel"
              value={phoneNumber}
              onChange={handlePhoneNumberChange}
              className="bg-[#F8F8F8] rounded-[8px] h-[56px] px-[16px] w-[100%]"
            />
          </div>
          <div className="flex flex-col gap-[16px]">
            <p className="text-[0.875rem]">Email Address</p>
            <input
              type="email"
              value = {email}
              onChange={handleEmailChange}
              className="bg-[#F8F8F8] rounded-[8px] h-[56px] px-[16px] w-[100%]"
            />
          </div>
          <div className="flex flex-col gap-[16px]">
            <p className="text-[0.875rem]">Password</p>
            <input
              type="password"
              value = {password}
              onChange={handlePasswordChange}
              className="bg-[#F8F8F8] rounded-[8px] h-[56px] px-[16px] w-[100%]"
            />
            <p>Password should be at least 8 characters</p>
          </div>

          <div className="flex gap-[10px]">
            <input type="checkbox" name="" />
            <p>Accept our Term of Use and Condition</p>
          </div>

          <button 
            onClick={handleSignUp}  
            disabled={isLoading}
            className="bg-[#242424] w-[100%] h-[56px] rounded-[8px] px-[16px] text-[#ffffff]">
              {isLoading ? "Loading ..." : "Sign Up"}
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
