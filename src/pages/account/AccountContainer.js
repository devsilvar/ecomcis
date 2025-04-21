import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../../components/account/Sidebar";
import { Wrapper } from "../../components/common/Wrapper";
import { WebsiteLayout } from "../../components/common/WebsiteLayout";

function AccountContainer() {
  return (
    <WebsiteLayout>
      <section className="py-10 md:py-20">
        <Wrapper className="flex flex-col md:flex-row items-center">
          <Sidebar />
          <Outlet />
        </Wrapper>
      </section>
    </WebsiteLayout>
  );
}

export default AccountContainer;
