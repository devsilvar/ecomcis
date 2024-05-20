import React, { useContext, useState } from "react";
import Input from "../../components/admin/form/Input";
import { useAdminLoginMutation } from "../../services/adminsApi";
import AuthContext from "../../AuthContext/AuthContext";
import { Navigate, useNavigate } from "react-router-dom";

function Login() {
  const [adminLogin] = useAdminLoginMutation();
  const [loading, setLoading] = useState(false);
  const { setUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSUbmit = (e) => {
    e.preventDefault();
    adminLogin({
      username: e.target.username.value,
      password: e.target.password.value,
    })
      .then((data) => {
        setLoading(false);

        localStorage.setItem("authToken", JSON.stringify(data.data.access));
        localStorage.setItem("refreshToken", JSON.stringify(data.refresh));
        setUser(data.data.access);
        navigate("/admin/dashboard");
      })
      .catch((err) => {
        setLoading(false);
      });
  };
  return (
    <div className="mt-[100px] admin">
      <img src="/images/logo.svg" alt="" className="mx-auto" />

      <div className="w-[678px] mx-auto p-[54px] border-[1px] border-[#E0E0E0] mt-[46px] rounded-[16px]">
        <form className="flex flex-col gap-[17px]" onSubmit={handleSUbmit}>
          <Input
            topText="Username / Email address"
            placeholder="e.g. Username"
            name="username"
          />
          <Input topText="Password" placeholder="*******" name="password" />
          <button className="h-[46px] rounded-[8px] bg-[#242424] px-[25px]">
            <p className="text-[#fff]">Login</p>
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
