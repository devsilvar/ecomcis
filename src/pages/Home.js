import React, { useEffect, useState } from "react";
import {
  PiHeart,
  PiInstagramLogoFill,
  PiMagnifyingGlass,
  PiTiktokLogoFill,
} from "react-icons/pi";
import { Cart } from "../assets/icons/Cart";
import { Heart } from "../assets/icons/Heart";
import Logo from "../assets/icons/Logo";
import { Search } from "../assets/icons/Search";
import { Hero } from "../components/common/Hero";
import { WebsiteLayout } from "../components/common/WebsiteLayout";
import { Wrapper } from "../components/common/Wrapper";
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
