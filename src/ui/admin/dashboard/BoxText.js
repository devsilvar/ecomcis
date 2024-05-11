import clsx from "clsx";
import React from "react";

function BoxText({ text, className }) {
  return <p className={clsx("text-[1.5rem] font-[700]", className)}>{text}</p>;
}

export default BoxText;
