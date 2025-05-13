import React from "react";
import ProductsTables from "../../components/admin/tables/ProductsTables";
import WelcomeTab from "../../components/admin/WelcomeTab";
import { useSelector } from "react-redux";
import ReportFilter from "../../components/admin/ReportFilter";

function Reports() {
  
  const {data:productList , loading:productLoading}  = useSelector((state) => state.listProduct);
  return (
    <div>
      <div className="max-w-[1090px] mx-auto">
        <div className="mx-[24px]">
          <WelcomeTab tabName="All Reports" />
          <div className="flex justify-between  ">
            <div className="w-[100%]">
              <ReportFilter />
              <div className="bg-[#ffffff] w-[100%] py-[16px]">
                <ProductsTables products={productList} loading={productLoading} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Reports;
