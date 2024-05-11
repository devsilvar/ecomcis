import clsx from "clsx";
import React from "react";

function SelectFormTab({ text, handleSetWhatForm, whatForm, icon }) {
  return (
    <div
      className={clsx(
        "h-[56px] flex items-center gap-[10px] justify-center cursor-pointer",
        whatForm === text ? "bg-[#F8F8F8] " : ""
      )}
      onClick={() => handleSetWhatForm(text)}
    >
      {icon}
      <p>{text}</p>
    </div>
  );
}

export default SelectFormTab;
