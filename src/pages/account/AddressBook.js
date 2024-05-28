import React from "react";
import SubText from "../../ui/account/SubText";
import Text from "../../ui/account/Text";

function AddressBook() {
  return (
    <div className="w-[100%] border-[1px] max-w-[953px] p-[16px] h-[645px] overflow-scroll flex flex-col gap-[24px]">
      <div className="flex justify-between">
        <p>ADDRESS BOOK</p>
        <button className="bg-[#F2F2F2] px-[22px] py-[8px]">EDIT</button>
      </div>

      <div>
        <SubText text="ADDRESS 1" />
        <Text text="Ikeja, Lagos State" />
      </div>

      <div>
        <SubText text="ADDRESS II" />
        <Text text="Block 11, Epe, Lagos State" />
      </div>

      <div></div>
    </div>
  );
}

export default AddressBook;
