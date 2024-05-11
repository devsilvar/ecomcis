import React from "react";
import WelcomeTab from "../../components/admin/WelcomeTab";
import DashboardBox from "../../ui/admin/dashboard/DashboardBox";
import ProductsFilter from "../../components/admin/ProductsFilter";
import ProductsTables from "../../components/admin/tables/ProductsTables";

function AdminProducts() {
  return (
    <div>
      <div className="max-w-[1090px] mx-auto">
        <div className="mx-[24px]">
          <WelcomeTab tabName="Products" />
          <div className="mt-[24px] flex gap-[10px] w-[100%]">
            <DashboardBox
              text={"1400"}
              bottomText={"Total products"}
              IconColor="bg-[#F2F2F2]"
            />
            <DashboardBox
              text={"100"}
              bottomText={"Newly Added Products"}
              IconColor="bg-[#F5EAFF]"
            />

            <DashboardBox
              text={"342"}
              bottomText={"Total Product Sold"}
              IconColor="bg-[#F9F9CC]"
            />
            <DashboardBox
              text={"10"}
              bottomText={"Number of Categories"}
              IconColor="bg-[#E6FFE6]"
            />
            <DashboardBox
              text={"9680"}
              bottomText={"Stock in hand"}
              IconColor="bg-[#E6FFE6]"
            />
          </div>

          <div className="flex justify-between  ">
            <div className="w-[100%]">
              <ProductsFilter />

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

export default AdminProducts;
