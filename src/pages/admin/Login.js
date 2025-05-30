import React, { useState } from "react";
import Input from "../../components/admin/form/Input";

import { Toaster } from 'react-hot-toast';

import ClipLoader from "react-spinners/ClipLoader";

import { useDispatch, useSelector } from "react-redux";
import { adminLogIn } from "../../store/features/admin/auth/login";

import PwdInput from "../../components/passwordInput";
import { Link } from "react-router-dom";


function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const adminLoginState = useSelector((state)=> state.adminLogin);

  const {loading} = adminLoginState;


  const dispatch = useDispatch()

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e) =>{
    setPassword(e.target.value)
  }

  const handleSUbmit = (e) => {
    e.preventDefault();

    dispatch(adminLogIn({
      username: username,
      password: password,
    }))

  }


  return (
    <div className="mt-[100px] admin">
   
      <img src="/images/logo.svg" alt="" className="mx-auto w-[80px]" />

      <div className="w-[678px] mx-auto p-[54px] border-[1px] border-[#E0E0E0] mt-[46px] rounded-[16px] text-[#4E0240]">
        <form className="flex flex-col gap-[17px]">
          <Input
            topText="Username / Email address"
            placeholder="e.g. Username"
            name="username"
            onChange={handleUsernameChange}
            value={username}
          />

            <PwdInput 
              onChange={handlePasswordChange}
              value={password}/>

          <button 
              className="h-[46px] rounded-[8px] bg-[#4E0240] px-[25px]"
              onClick={handleSUbmit}>

            <p className="text-[#fff]">{
              loading ? <ClipLoader
              size={20}
              aria-label="Loading Spinner"
              data-testid="loader"
              color="#ffffff"
            /> : "Log In"
            }</p>
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
