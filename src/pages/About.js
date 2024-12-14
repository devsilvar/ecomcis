import React from "react";
import Header from "../components/common/Header";
import Footer from "../components/common/Footer";

function About() {
  return <div>
    <Header />
    <div className="flex flex-col lg:flex-row flex-wrap p-5">
      <div className="w-[400px] p-3 mx-[auto]">
        <img className="w-[100%]" src="/images/product/img3.png" alt="about" />
      </div>
      <div className="flex-1 p-[30px] flex flex-col mt-[50px]">
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
          <strong>
            <i>
            We invite you to explore our collections and join us in celebrating the beauty of individuality through
            fashion
            </i>
          </strong>
        </p>
        <div className="w-[100px] mt-[50px]">
          <img className="w-[100%]" src="/images/logo-name.svg" alt="about" />
        </div>
      </div>

    </div>

    <div>
      <img className="w-[60%] m-[auto]" src="/images/quote.svg" alt="about" />
    </div>

    <div className="w-[60%] mx-[auto] my-[50px] flex flex-col lg:items-center">
      <h2 className="text-3xl font-bold">Mission & Vision</h2>
      <p className="text-[2rem] lg:text-center"><i>Empowering women through stylish, accessible fashion that celebrates individuality and confidence</i></p>
    </div>
    <Footer />
  </div>;
}

export default About;
