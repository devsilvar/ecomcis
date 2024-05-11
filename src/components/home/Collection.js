import React from "react";
import { FaArrowRight } from "react-icons/fa6";
import Container from "../../ui/Container";

function Collection() {
  return (
    <div className="pb-[96px]">
      <Container>
        <div className="flex gap-[16px] my-[30px] items-center">
          <p>SHOW COLLECTION</p>
          <FaArrowRight />
        </div>
      </Container>
      <img src="./images/home/img3.png" alt="" className="w-[100%]" />
    </div>
  );
}

export default Collection;
