import React from "react";
import Header from "../../components/common/Header";
import Footer from "../../components/common/Footer";
import { Outlet } from "react-router-dom";
import Sidebar from "../../components/account/Sidebar";
import { Container } from "@mui/material";

function AccountContainer() {
  return (
    <div>
      <Header />
      <div className="admin py-[40px] lg:max-w-[1280px] md:px-[50px] mx-[auto] w-[100%] px-[24px] xl:px-0 flex gap-[16px]">
        <Sidebar />
        <Outlet />
      </div>

      <Footer />
    </div>
  );
}

export default AccountContainer;
