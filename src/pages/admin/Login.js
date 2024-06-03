import React, { useContext, useState, useEffect } from "react";
import Input from "../../components/admin/form/Input";

import { Navigate, useNavigate } from "react-router-dom";

import ClipLoader from "react-spinners/ClipLoader";

import { useDispatch, useSelector } from "react-redux";
import { adminLogIn } from "../../store/features/admin/auth/login";


function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const adminLoginState = useSelector((state)=> state.adminLogin);

  const {data, error, loading} = adminLoginState;

  const navigate = useNavigate();

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

  useEffect(() => {
    if (data) {
        // Redirect to dashboard
        navigate('/admin/dashboard');
    }
}, [data, navigate]);

  return (
    <div className="mt-[100px] admin">
      <img src="/images/logo.svg" alt="" className="mx-auto" />

      <div className="w-[678px] mx-auto p-[54px] border-[1px] border-[#E0E0E0] mt-[46px] rounded-[16px]">
        <form className="flex flex-col gap-[17px]">
          <Input
            topText="Username / Email address"
            placeholder="e.g. Username"
            name="username"
            onChange={handleUsernameChange}
            value={username}
          />
          <Input 
            topText="Password" 
            placeholder="*******" 
            type="password"
            name="password" 
            onChange={handlePasswordChange}
            value={password}/>
          <button 
              className="h-[46px] rounded-[8px] bg-[#242424] px-[25px]"
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
