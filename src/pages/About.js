import React from "react";
import Header from "../components/common/Header";
import Footer from "../components/common/Footer";

function About() {
  return <div>
    <Header />
    <div className="flex flex-col lg:flex-row flex-wrap">
      <div className="flex-1 p-3 mx-[auto]">
        <img className="w-[100%]" src="/images/product/img3.png" alt="about" />
      </div>
      <div className="flex-1 p-5 flex flex-col justify-center">
        <h2 className="text-3xl font-bold">About Us</h2>
        <p>At Amaraé, we believe in the power of fashion to transform and empower. Our brand is dedicated to
          providing stylish, high-quality clothing that is accessible to women from all walks of life.
          Founded on the principles of inclusivity and empowerment, we celebrate individuality and
          confidence, offering a diverse range of designs that empower women to express their unique
          identities.
        </p>
        <br/>
        <p>
          Our collections are thoughtfully curated to reflect a diverse range of styles and preferences, ensuring
          that every woman can find something that resonates with her unique sense of style. At the heart of
          Amaraé is a commitment to our customers, prioritizing their needs and experiences in everything we
          do.
        </p>
        <br/>
        <p>
          We invite you to explore our collections and join us in celebrating the beauty of individuality through
          fashion
        </p>
      </div>
    </div>
    <Footer />
  </div>;
}

export default About;
