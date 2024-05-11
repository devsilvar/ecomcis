import React from "react";
import DataTable from "react-data-table-component";
import WelcomeTab from "../../components/admin/WelcomeTab";

const columns = [
  {
    name: "Order ID",
    selector: (row) => row.title,
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
function Customers() {
  return (
    <div>
      <div className="max-w-[1090px] mx-auto">
        <div className="mx-[24px]">
          <WelcomeTab tabName="Customers" />
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

export default Customers;
