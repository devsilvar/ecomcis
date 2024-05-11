import React, { useEffect, useState } from "react";
import WelcomeTab from "../../components/admin/WelcomeTab";
import DashboardBox from "../../ui/admin/dashboard/DashboardBox";
import { RiArrowDropDownLine } from "react-icons/ri";
import DataTable from "react-data-table-component";
import CompletedOrderBox from "../../components/admin/CompletedOrderBox";
import clsx from "clsx";
import Chart from "../../components/admin/Chart";
import { useGetAllProductsQuery, useGetPostsQuery } from "../../services/api";
import { useDispatch, useSelector } from "react-redux";

// import { ChromePicker, SketchPicker } from "react-color";
const columns = [
  {
    name: "Order ID",
    selector: (row) => row.title,
  },
  {
    name: "Products",
    selector: (row) => (
      <div className="flex  gap-[4px]">
        <img src="/images/image.png" alt="" className="w-[52px] h-[52px]" />
        <div className="flex flex-col items-between justify-between">
          <p> {row.product}</p>
          <p> {row.product}</p>
          <p> {row.product}</p>
        </div>
      </div>
    ),
  },
  {
    name: "Customers",
    selector: (row) => row.year,
  },
  {
    name: "Qty",
    selector: (row) => row.year,
  },
  {
    name: "Price",
    selector: (row) => row.year,
  },
  {
    name: "Status",
    selector: (row) => row.year,
  },
];

const data = [
  {
    id: 1,
    title: "Beetlejuice",
    year: "1988",
    product: "bikini",
  },
  {
    id: 2,
    title: "Ghostbusters",
    year: <p>jk</p>,
    product: "bikini",
  },
];

const customStyles = {
  rows: {
    style: {
      padding: "12px 0px",
    },
  },
  headCells: {
    style: {
      paddingLeft: "8px",
      paddingRight: "8px",
      background: "#F8F8F8",
    },
  },
  cells: {
    style: {
      paddingLeft: "8px",
      paddingRight: "8px",
    },
  },
};
function Dashboard() {
  const [filterOption, setFilterOption] = useState("Latest Orders");
  const [openFilter, setOpenFilter] = useState(false);
  const handleSetFilter = (e) => {
    setFilterOption(e.target.innerText);
    setOpenFilter(false);
  };
  const [color, setColor] = useState("#000000"); // Initial color is black

  const dispatch = useDispatch();

  // product data
  const {
    data: allproducts,
    error: productsError,
    isError,
    isLoading,
  } = useGetAllProductsQuery();
  // product ata

  // Store data to redux store on loading state from redux toolkit query update
  useEffect(() => {
    if (!isLoading) {
      if (!isError) {
        console.log(allproducts.results);
      } else {
        console.log(productsError);
      }
    }
  }, [isLoading]);

  const handleColorChange = (newColor) => {
    setColor(newColor.hex);
  };
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
              bottomText={"Available Balance"}
              IconColor="bg-[#F2F2F2]"
            />
            <DashboardBox
              textColor="text-[#9B51E0]"
              topText={"Available Balance"}
              icon={"/images/icons/icon.svg"}
              text={"₦300,000.00"}
              bottomText={"Available Balance"}
              IconColor="bg-[#F5EAFF]"
            />
            <DashboardBox
              topText={"Available Balance"}
              icon={"/images/icons/icon-1.svg"}
              text={"₦300,000.00"}
              bottomText={"Available Balance"}
              IconColor="bg-[#E6FFE6]"
              textColor="text-[#008000]"
            />
            <DashboardBox
              topText={"Available Balance"}
              icon={"/images/icons/icon-2.svg"}
              text={"₦300,000.00"}
              bottomText={"Available Balance"}
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
                <DataTable
                  columns={columns}
                  data={data}
                  pagination
                  customStyles={customStyles}
                />
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
