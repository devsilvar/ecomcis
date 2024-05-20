import React from "react";

function Categories() {
  return (
    <div className="absolute top-[80px] z-[10] border-[1px] right-[440px] min-w-[622px] h-[555px] bg-[#ffffff] px-[52px] py-[42px] flex">
      <div>
        <img src="./images/home/img2.png" className="w-[370px]" alt="" />
      </div>
      <div className="ml-[20px] h-[300px] flex flex-col flex-wrap gap-[24px]">
        <p>Jean</p>
        <p>Jean</p>
        <p>Jean</p>
        <p>Jean</p> <p>Jean</p> <p>Jean</p> <p>Jean</p> <p>Jean</p> <p>Jean</p>{" "}
        <p>Jean</p> <p>Jean</p> <p>Jean</p>
        <p>Jean</p>
      </div>
    </div>
  );
}

export default Categories;
