import clsx from "clsx";
import React from "react";

function Input({ name, placeholder, topText, className, type, value, onChange }) {
  return (
    <div className={clsx(className)}>
      <p className="text-[0.875rem] mb-[10px]">{topText}</p>
      <input
        className="border-[#E0E0E0] bg-[#F8F8F8] border-[1px] h-[46px] w-[100%] rounded-[8px] px-[16px]"
        placeholder={placeholder}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
      />
    </div>
  );
}

export default Input;
