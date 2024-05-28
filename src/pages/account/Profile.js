import React from "react";
import SubText from "../../ui/account/SubText";
import Text from "../../ui/account/Text";

function Profile() {
  return (
    <div className="w-[100%] border-[1px] max-w-[953px] p-[16px] h-[645px] overflow-scroll flex flex-col gap-[24px]">
      <div className="flex justify-between">
        <p className="font-[700] text-[1.25rem]">MY PROFILE</p>
        <button className="bg-[#F2F2F2] px-[22px] py-[8px]">EDIT</button>
      </div>

      <div>
        <SubText text="NAME" />
        <Text text="John Micheal" />
      </div>

      <div>
        <SubText text="EMAIL" />
        <Text text="Johncen@gamil.com" />
      </div>
    </div>
  );
}

export default Profile;
