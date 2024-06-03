import React from "react";

import Container from "../../ui/Container";

function Latest() {
  return (
    <Container className="mt-[116px] lg:flex lg:gap-[67px] items-end">
      <div className="lg:w-[40%] w-[100%]">
        <p className="text-[1rem] font-[400]">Latest</p>
        <h1 className="xl:text-[2rem] text-[1.25rem] font-[700] lg:mt-[72px]">
          LATEST ARRIVALS
          <br />
          2024
        </h1>
        <div className="mt-[30px]">
          <img src="./images/home/img2.png" className="w-[100%]" alt="" />
        </div>
      </div>
      <div className="mt-[30px] lg:w-[60%] w-[100%]">
        <img src="./images/home/img1.png" className="w-[100%]" alt="" />
      </div>
    </Container>
  );
}

export default Latest;
