import React, { useState } from "react";
import { FaRegCircleUser } from "react-icons/fa6";
import { FaKey } from "react-icons/fa";
import BusinessInfoForm from "../../components/admin/form/BusinessInfoForm";
import SelectFormTab from "../../components/admin/settings/SelectFormTab";
import SecurityForm from "../../components/admin/form/SecurityForm";

function Extra() {
  const [whatForm, setWhatForm] = useState("Extras");

  const handleSetWhatForm = (text) => {
    setWhatForm(text);
  };
  return (
    <div>
      <div className="max-w-[1090px] mx-auto">
        <div className="mx-[24px] flex mt-[25px] gap-[8px]">
          <div className="w-[301px] bg-[#ffffff] min-h-[100vh] px-[16px] py-[21px]">
            <p>Extras</p>
            
          </div>

        </div>
      </div>
    </div>
  );
}

export default Extra;
