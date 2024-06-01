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
      <Carousel imagesArray={
        ["./images/home/slider.png", "./images/home/slider2.jpg", "./images/home/slider3.jpg"]} />
      <Latest />
      <Collection />
      <Footer />
    </div>
  );
}

export default Home;
