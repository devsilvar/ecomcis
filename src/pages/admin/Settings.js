import React, { useState } from "react";
import { FaRegCircleUser } from "react-icons/fa6";
import { FaKey } from "react-icons/fa";
import BusinessInfoForm from "../../components/admin/form/BusinessInfoForm";
import SelectFormTab from "../../components/admin/settings/SelectFormTab";
import SecurityForm from "../../components/admin/form/SecurityForm";

function Settings() {
  const [whatForm, setWhatForm] = useState("Profile Settings");

  const handleSetWhatForm = (text) => {
    setWhatForm(text);
  };
  return (
    <div>
      <div className="max-w-[1090px] mx-auto">
        <div className="mx-[24px] flex mt-[25px] gap-[8px]">
          <div className="w-[301px] bg-[#ffffff] min-h-[100vh] px-[16px] py-[21px]">
            <p>Settings</p>

            <div className="mt-[22px] flex flex-col gap-[8px]">
              <SelectFormTab
                text={"Profile Settings"}
                handleSetWhatForm={handleSetWhatForm}
                whatForm={whatForm}
                icon={<FaRegCircleUser />}
              />

              <SelectFormTab
                text={"Security Settings"}
                handleSetWhatForm={handleSetWhatForm}
                whatForm={whatForm}
                icon={<FaKey />}
              />
            </div>
          </div>

          <div className="flex-1 bg-[#ffffff] min-h-[100vh]">
            <div className="w-[500px] mx-[auto] mt-[49px]">
              {whatForm === "Profile Settings" ? (
                <BusinessInfoForm />
              ) : (
                <SecurityForm />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Settings;
