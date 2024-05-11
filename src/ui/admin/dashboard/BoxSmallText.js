import clsx from "clsx";
import React from "react";

function BoxSmallText({ text, className }) {
  return (
    <p className={clsx("text-[#828282] text-[0.875rem]", className)}>{text}</p>
  );
}

export default BoxSmallText;
