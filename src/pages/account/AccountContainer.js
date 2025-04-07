import React from "react";
import Header from "../../components/common/Header";
import Footer from "../../components/common/Footer";
import { Outlet } from "react-router-dom";
import Sidebar from "../../components/account/Sidebar";
import { Wrapper } from "../../components/common/Wrapper";
import { WebsiteLayout } from "../../components/common/WebsiteLayout";

function AccountContainer() {
  return (
    <WebsiteLayout>
      <Wrapper>
        <Sidebar />
        <Outlet />
      </Wrapper>
    </WebsiteLayout>
  );
}

export default AccountContainer;
