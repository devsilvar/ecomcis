import React from "react";
import Header from "../../components/common/Header";
import Footer from "../../components/common/Footer";
import { Outlet } from "react-router-dom";
import Sidebar from "../../components/account/Sidebar";

function AccountContainer() {
  return (
    <div>
      <Header />
      <div className=" py-[40px] lg:max-w-[1280px] md:px-[50px] mx-[auto] w-[100%] px-[24px] xl:px-0 md:flex gap-[16px]">
        <Sidebar />
        <Outlet />
      </div>

      <Footer />
    </div>
  );
}

export default AccountContainer;
