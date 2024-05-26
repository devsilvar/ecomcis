import React from "react";

function Profile() {
  return (
    <div className="w-[100%] border-[1px] max-w-[953px] p-[16px] h-[645px] overflow-scroll flex flex-col gap-[24px]">
      <div className="flex justify-between">
        <p>MY PROFILE</p>
        <button className="bg-[#F2F2F2] px-[22px] py-[8px]">EDIT</button>
      </div>

      <div>
        <p>NAME</p>
        <p>John Cena</p>
      </div>

      <div>
        <p>EMAIL</p>
        <p>Johncen@gamil.com</p>
      </div>

      <div>
        <p>PHONE NUMBER</p>
        <p>234567890</p>
      </div>
    </div>
  );
}

export default Profile;
