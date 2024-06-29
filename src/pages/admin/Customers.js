import React, {useState, useEffect} from "react";
import DataTable from "react-data-table-component";
import WelcomeTab from "../../components/admin/WelcomeTab";

import { useDispatch, useSelector } from "react-redux";
import { getAdminCustomers } from "../../store/features/admin/customers";
import MoonLoader from "react-spinners/MoonLoader";
import { formatDate } from "../../utils/nairaFormat";

const columns = [
  {
    name: "Customer ID",
    selector: (row) => row.customer_id,
  },

  {
    name: "Full Name",
    selector: (row) => row.full_name,
  },
  {
    name: "Mobile Number",
    selector: (row) => row.mobile,
  },
  {
    name: "Date Joined",
    selector: (row) => formatDate(row.created_at),
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
  const dispatch = useDispatch()
  const [customers, setCustomers] = useState([])
  const {data, loading} = useSelector((store) => store.getCustomers)

  useEffect(()=>{
    dispatch(getAdminCustomers())
  }, [])

  useEffect(()=>{
    if(data){
      setCustomers(data.results)
    }
  }, [])

  console.log(data)

  return (
    <div>
      <div className="max-w-[1090px] mx-auto">
        <div className="mx-[24px]">
          <WelcomeTab tabName="Customers" />
          <div className="flex justify-between mt-[10px] ">
            <div className="w-[100%]">
              <div className="bg-[#ffffff] w-[100%] py-[16px]">
                {loading ? <MoonLoader /> : 
                
                  <DataTable
                    columns={columns}
                    data={data?.results}
                    pagination
                    customStyles={customStyles}
                  />
                }
                
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Customers;
