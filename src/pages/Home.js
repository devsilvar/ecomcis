import React from "react";
import Header from "../components/common/Header";
import Latest from "../components/home/Latest";
import Carousel from "../components/home/Carousel";
import Collection from "../components/home/Collection";
import Footer from "../components/common/Footer";

function Home() {
  return (
    <div>
      <Header />
      <Carousel />
      <Latest />
      <Collection />
      <Footer />
    </div>
  );
}

export default Home;
