import React from "react";

function Input({ name, placeholder, topText }) {
  return (
    <div>
      <p className="mb-[16px]">{topText}</p>
      <input
        className="border-[#E0E0E0] bg-[#F8F8F8] border-[1px] h-[46px] w-[100%] rounded-[8px] px-[16px]"
        placeholder={placeholder}
        name={name}
      />
    </div>
  );
}

export default Input;
