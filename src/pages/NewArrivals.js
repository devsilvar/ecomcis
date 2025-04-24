import React from "react";
import { WebsiteLayout } from "../components/common/WebsiteLayout";
import { Wrapper } from "../components/common/Wrapper";

export const NewArrivals = () => {
  return (
    <WebsiteLayout>
      <section className="py-10">
        <Wrapper>
          <h1 className="md:text-4xl text-3xl">
            New In outfit selected for your elegance and comfort.
          </h1>
          {/* <Products /> */}
        </Wrapper>
      </section>
    </WebsiteLayout>
  );
};
