import React from "react";
import { Hero } from "../components/common/Hero";
import { WebsiteLayout } from "../components/common/WebsiteLayout";
import { EveryStich } from "../components/home/EveryStich";
import { Others } from "../components/home/Others";
import { Subscribe } from "../components/home/Subscribe";

function Home() {
  return (
    <WebsiteLayout>
      <Hero />
      <EveryStich />
      <Subscribe />
      <Others />
    </WebsiteLayout>
  );
}

export default Home;
