import React from "react";
import WelcomeTab from "../../components/admin/WelcomeTab";
import AdminTable from "../../components/admin/tables/AdminTable";

function Admins() {
  return (
    <div>
      <div className="max-w-[1090px] mx-auto">
        <div className="mx-[24px]">
          <WelcomeTab tabName="Admins" />
          <div className="flex justify-between mt-[10px] ">
            <div className="w-[100%]">
              <div className="bg-[#ffffff] w-[100%] py-[16px]">
                <AdminTable />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Admins;
