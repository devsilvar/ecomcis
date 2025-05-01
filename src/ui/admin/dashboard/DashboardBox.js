import clsx from "clsx";
import React from "react";
import BoxSmallText from "./BoxSmallText";
import BoxText from "./BoxText";

function DashboardBox({
  icon,
  topText,
  bottomText,
  text,
  textColor,
  IconColor,
}) {
  return (
    <div className="bg-[#ffffff] w-[calc(100%/4)] max-h-[140px] rounded-[8px] p-[16px]">
      <div>
        {icon && (
          <div className={clsx("flex items-center gap-[8px]")}>
            <div
              className={clsx(
                "flex gap-[8px] items-center h-[40px] w-[40px] rounded-[50%] flex items-center justify-center",
                IconColor
              )}
            >
              <img src={icon} alt="" />
            </div>
          
            <BoxSmallText text={topText} />
          </div>
        )}
      </div>
      <BoxText text={text} className={textColor} />
      <BoxSmallText text={bottomText} />
    </div>
  );
}

export default DashboardBox;
