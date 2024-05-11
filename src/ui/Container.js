import { clsx } from "clsx";
import React from "react";

function Container({ className, children }) {
  return (
    <div
      className={clsx(
        "lg:max-w-[1280px] md:px-[50px] mx-[auto] w-[100%] px-[24px] xl:px-0",
        className
      )}
    >
      {children}
    </div>
  );
}

export default Container;
