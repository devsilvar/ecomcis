import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";

import { signUp } from "../store/features/auth/signUpFeature";
import { useSelector, useDispatch } from "react-redux";
import { Toaster } from 'react-hot-toast';
import ClipLoader from "react-spinners/ClipLoader";
import PwdInput from "../components/passwordInput";
import Button from "../components/common/Button";

function CreateAccount() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  

  const sigUpState = useSelector((state) => state.signUp);

  const { loading } = sigUpState;

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

  const dispatch = useDispatch();

  const handleSignUp = (e) => {
    e.preventDefault();
    const payload = {
      email: email,
      password: password,
      full_name: fullName,
      mobile: phoneNumber,
      is_active: true,
    };
    dispatch(signUp(payload))
  }

  return (

    <div className="flex min-h-[100vh]">
 
      <div className="lg:w-[50%] w-[100%] text-[#4E0240] flex flex-col items-center justify-center px-[24px]">
        <Link to="/">
          <img src="/images/logo-name.svg" alt="amaraé" className="w-[65px] my-5"/>
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
            <PwdInput value={password} onChange={handlePasswordChange} />
            <p className="text-[#ff0000]">Password should be at least 8 characters</p>
          </div>

          <div className="flex gap-[10px]">
            <input type="checkbox" name="" />
            <p>Accept our Term of Use and Condition</p>
          </div>

          <Button 
            onClick={handleSignUp}  
            disabled={loading}
            >
              {loading ? <ClipLoader size={10} color="#fff" /> : "Sign Up"}
          </Button>
          <p>Already have an account? <Link to="/register">Log In</Link></p>
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
