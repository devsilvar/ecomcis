import React from "react";
import Container from "../../ui/Container";

const filterOptions = ["CATEGORIES", "PRICE", "SIZE", "COLOR"];

function Filter() {
  return (
    <Container className="flex justify-between  overflow-scroll gap-[24px]">
      <div className="flex gap-[24px]">
        {filterOptions.map((option) => (
          <select key={option} className="border-r-[1px] pr-[16px]">
            <option value="">{option}</option>
          </select>
        ))}
      </div>
      <div>
        <select>
          <option value="">SORT BY</option>
        </select>
      </div>
    </Container>
  );
}

export default Filter;
