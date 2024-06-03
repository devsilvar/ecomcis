import React, { useEffect, useState } from "react";
import WelcomeTab from "../../components/admin/WelcomeTab";
import DashboardBox from "../../ui/admin/dashboard/DashboardBox";
import { RiArrowDropDownLine } from "react-icons/ri";
import CompletedOrderBox from "../../components/admin/CompletedOrderBox";
import clsx from "clsx";
import Chart from "../../components/admin/Chart";
// import { useGetDashboardOverviewQuery } from "../../services/overviewapi";
import ProductsTables from "../../components/admin/tables/ProductsTables";

import { ChromePicker, SketchPicker } from "react-color";

function Dashboard() {
  const [filterOption, setFilterOption] = useState("Latest Orders");
  const [openFilter, setOpenFilter] = useState(false);
  // const { data, error, isError, isLoading } = useGetDashboardOverviewQuery();

  // useEffect(() => {
  //   if (!isLoading) {
  //     if (!isError) {
  //     } else {
  //       console.log(error);
  //     }
  //   }
  // }, [isLoading, isError]);
  const handleSetFilter = (e) => {
    setFilterOption(e.target.innerText);
    setOpenFilter(false);
  };
  // const [color, setColor] = useState("#000000");

  // const handleColorChange = (newColor) => {
  //   setColor(newColor.hex);
  // };
  return (
    <div>
      <div className="max-w-[1090px] mx-auto">
        <div className="mx-[24px] xl:mx-0">
          <WelcomeTab />
          <div className="mt-[24px] flex gap-[10px] w-[100%] -z-[1]">
            {/* <ChromePicker color={color} onChange={handleColorChange} /> */}
            <DashboardBox
              topText={"Available Balance"}
              icon={"/images/icons/wallet.svg"}
              text={"₦300,000.00"}
              bottomText={"Total Available Balance"}
              IconColor="bg-[#F2F2F2]"
            />
            <DashboardBox
              textColor="text-[#9B51E0]"
              topText={"Available Products"}
              icon={"/images/icons/icon.svg"}
              // text={data && data.total_available_products}
              bottomText={"Total available Products"}
              IconColor="bg-[#F5EAFF]"
            />
            <DashboardBox
              topText={"Completed Orders"}
              icon={"/images/icons/icon-1.svg"}
              // text={data && data.total_completed_orders}
              bottomText={"Total completed Orders"}
              IconColor="bg-[#E6FFE6]"
              textColor="text-[#008000]"
            />
            <DashboardBox
              topText={"Ratings"}
              icon={"/images/icons/icon-2.svg"}
              // text={data && data.average_ratings}
              bottomText={"Average service ratings"}
              IconColor="bg-[#F9F9CC]"
              textColor="text-[#008000]"
            />
          </div>

          <div className="flex justify-between gap-[16px] mt-[10px] ">
            <div className="w-[100%]">
              <div className="bg-[#ffffff] w-[100%] py-[16px]">
                <div
                  className="flex px-[10px] max-w-[200px] h-[44px] justify-between items-center border-[1px] rounded-[8px] ml-[16px] mb-[16px] relative"
                  onClick={() => {
                    setOpenFilter(!openFilter);
                  }}
                >
                  <p className="text-nowrap">{filterOption}</p>
                  <RiArrowDropDownLine className="text-[25px]" />
                  <div
                    className={clsx(
                      "absolute top-[40px] w-[100%] right-[0] bg-[#fff] z-[10] rounded-[8px] border-[1px] ",
                      openFilter ? "block" : "hidden"
                    )}
                  >
                    <p
                      className="text-center py-[10px] border-b-[1px] text-[0.875rem]"
                      onClick={handleSetFilter}
                    >
                      Latest Orders
                    </p>
                    <p
                      className="text-center py-[10px] border-b-[1px] text-[0.875rem]"
                      onClick={handleSetFilter}
                    >
                      Pending Orders
                    </p>
                    <p
                      className="text-center py-[10px] border-b-[1px] text-[0.875rem]"
                      onClick={handleSetFilter}
                    >
                      Completed Orders
                    </p>
                  </div>
                </div>
                <ProductsTables />
                
              </div>
            </div>
            <div>
              <div className="w-[328px] h-[366px] bg-[#ffffff] rounded-[8px] p-[16px] ">
                <Chart />
              </div>
              <div className="w-[328px] mt-[16px] bg-[#ffffff] rounded-[8px] p-[16px]">
                <div className="flex justify-between">
                  <p className="font-[500]">Completed Orders</p>
                  <div className="text-[#9747FF] flex items-center">
                    <p className="text-[0.875rem] text-nowrap">View All</p>
                    <img src="/images/icons/arrow-up-right.svg" alt="" />
                  </div>
                </div>

                <div>
                  <CompletedOrderBox />
                  <CompletedOrderBox />
                  <CompletedOrderBox />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
