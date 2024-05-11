import React from "react";
import ProductsTables from "../../components/admin/tables/ProductsTables";
import WelcomeTab from "../../components/admin/WelcomeTab";
import ReportFilter from "../../components/admin/ReportFilter";

function Reports() {
  return (
    <div>
      <div className="max-w-[1090px] mx-auto">
        <div className="mx-[24px]">
          <WelcomeTab tabName="All Reports" />
          <div className="flex justify-between  ">
            <div className="w-[100%]">
              <ReportFilter />
              <div className="bg-[#ffffff] w-[100%] py-[16px]">
                <ProductsTables />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Reports;
