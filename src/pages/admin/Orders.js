import React from "react";
import DashboardBox from "../../ui/admin/dashboard/DashboardBox";
import DataTable from "react-data-table-component";
import WelcomeTab from "../../components/admin/WelcomeTab";

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
    },
  },
  cells: {
    style: {
      paddingLeft: "8px",
      paddingRight: "8px",
    },
  },
};
function Orders() {
  return (
    <div>
      <div className="max-w-[1090px] mx-auto">
        <div className="mx-[24px]">
          <WelcomeTab tabName="Orders" />
          <div className="mt-[24px] flex gap-[10px] w-[100%]">
            <DashboardBox
              text={"1000"}
              bottomText={"Total Orders"}
              IconColor="bg-[#F2F2F2]"
            />
            <DashboardBox
              text={"200"}
              bottomText={"Completed Orders"}
              IconColor="bg-[#F5EAFF]"
            />
            <DashboardBox
              text={"150"}
              bottomText={"Ongoing Orders"}
              IconColor="bg-[#E6FFE6]"
            />
            <DashboardBox
              text={"100"}
              bottomText={"Abandoned Carts"}
              IconColor="bg-[#F9F9CC]"
            />
            <DashboardBox
              text={"100"}
              bottomText={"Cancelled Orders"}
              IconColor="bg-[#F9F9CC]"
            />
          </div>
          <div className="flex justify-between mt-[10px] ">
            <div className="w-[100%]">
              <div className="bg-[#ffffff] w-[100%] py-[16px]">
                <DataTable
                  columns={columns}
                  data={data}
                  pagination
                  customStyles={customStyles}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Orders;
