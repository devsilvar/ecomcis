import React, {useEffect} from "react";
import DashboardBox from "../../ui/admin/dashboard/DashboardBox";
import DataTable from "react-data-table-component";
import WelcomeTab from "../../components/admin/WelcomeTab";
import { getAdminOrders } from "../../store/features/admin/orders";

import NairaFormat from "../../utils/nairaFormat";

import { useDispatch, useSelector } from "react-redux";
import { formatDateOnly } from "../../utils/nairaFormat";
import { Link } from "react-router-dom";


const getStatus = (status)=>{
  switch(status) {
    case 'P':
      return 'Pending'
    case 'A':
      return 'Accepted'
    default:
      return 'Pending'
  }
}


function Orders() {
  const dispatch = useDispatch()
  const {data, loading} = useSelector((store) => store.getAdminOrder)

  const handleGetOrders = ()=>{
    dispatch(getAdminOrders())
  }
  
  useEffect(()=>{
    handleGetOrders()
  }, [])


  return (
    <div>
      <div className="max-w-[1090px] mx-auto">
        <div className="mx-[24px]">
          <WelcomeTab tabName="Orders" />
          <div className="mt-[24px] flex gap-[10px] w-[100%]">
            <DashboardBox
              text={data?.length}
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
              <div className="container mx-auto py-8">
                <div className="overflow-x-auto">
                  <table className="min-w-full bg-white border border-gray-300">
                    <thead>
                      <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
                        <th className="py-3 px-6 text-left">Order Id</th>
                        <th className="py-3 px-6 text-left">Product</th>
                        <th className="py-3 px-6 text-left">Buyer</th>
                        <th className="py-3 px-6 text-left">Status</th>
                        <th className="py-3 px-6 text-left">Price</th>
                        <th className="py-3 px-6 text-left">Date</th>
                        <th className="py-3 px-6 text-left">Detail</th>
                      </tr>
                    </thead>

                    <tbody className="text-gray-600 text-sm font-light">
                      {data?.map(order => (
                        <tr key={order.id} className="border-b border-gray-200 hover:bg-gray-100">
                          <td className="py-3 px-6 text-left whitespace-nowrap">
                            {order.order_number.substring(13)
                          }</td>
                          <td className="py-3 px-6 text-left whitespace-nowrap">
                            <div className="flex items-center">
                              <img
                                src={order.orderitems[0]?.image}
                                alt={order.orderitems[0]?.name}
                                className="w-16 h-16 object-cover mr-4"
                              />
                              <div>
                                  {order.orderitems.map((item)=>{
                                    return (
                                      <p>{item.name}</p>
                                    )
                                  })}
                              </div>
                            </div>
                          </td>
                          <td className="py-3 px-6 text-left">
                            <p>{order.buyer.name}</p>
                            <p>{order.buyer.email}</p>
                          </td>
                          <td className="py-3 px-6 text-left">
                            <div className="flex items-center">
                              <p>{getStatus(order.status)}</p>
                            </div>
                          </td>
                          <td className="py-3 px-6 text-left">
                            <div className="flex items-center">
                              <p>{NairaFormat.format(order.total_amount)}</p>
                            </div>
                          </td>
                          
                          <td className="py-3 px-6 text-left">
                            <div className="flex items-center">
                              <p>{formatDateOnly(order.created_at)}</p>
                            </div>
                          </td>

                          <td className="py-3 px-6 text-left">
                            <div className="text-[#105C87] text-[0.625rem] font-[700] px-3 py-2 bg-[[#81D2FF]" >
                              <Link to={'order/'+ order.id}>View Detail</Link>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>

                  </table>
                </div>
              </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Orders;
