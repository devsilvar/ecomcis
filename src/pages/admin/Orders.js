import React, {useEffect} from "react";
import DashboardBox from "../../ui/admin/dashboard/DashboardBox";

import WelcomeTab from "../../components/admin/WelcomeTab";
import { getAdminOrders } from "../../store/features/admin/orders";

import {formatMoney} from "../../utils/nairaFormat";
import { useCurrency } from "../../utils/CurrencyProvider";
import MoonLoader from "react-spinners/MoonLoader";

import { useDispatch, useSelector } from "react-redux";
import { formatDateOnly } from "../../utils/nairaFormat";
import { Link } from "react-router-dom";
import classNames from 'classnames';
import ContentLoader from "react-content-loader";



const getStatus = (status)=>{
  switch(status) {
    case 'P':
      return 'Pending'
    case 'S':
      return 'Shipped'
    case 'C':
      return 'Completed'
    case 'X':
      return 'Cancelled'
    default:
      return 'Pending'
  }
}


function Orders() {
  const {currency} = useCurrency();
  const dispatch = useDispatch()
  const {data, loading} = useSelector((store) => store.getAdminOrder)

  const handleGetOrders = ()=>{
    dispatch(getAdminOrders())
  }
  
  useEffect(()=>{
    handleGetOrders()
  }, [])

  const statuses = ['P', 'S', 'C', 'X'];

  // Count the occurrences of each status using reduce
  const statusCounts = data?.reduce((acc, item) => {
    if (statuses.includes(item.status)) {
      acc[item.status] = (acc[item.status] || 0) + 1;
    }
    return acc;
  }, {});


  const MyLoader = () => (
    <ContentLoader viewBox="0 0 380 70">
      <rect x="0" y="0" rx="5" ry="5" width="50" height="70" />
      <rect x="75" y="0" rx="5" ry="5" width="50" height="70" />
      <rect x="150" y="0" rx="5" ry="5" width="50" height="70" />
      <rect x="220" y="0" rx="5" ry="5" width="0" height="70" />
    </ContentLoader>
  )


  return (
    <div>
      <div className="max-w-[1090px] mx-auto">
        <div className="mx-[24px]">
          <WelcomeTab tabName="Orders" />
          {loading ? <MyLoader />:
          (
            <div className="mt-[24px] flex gap-[10px] w-[100%]">
              <DashboardBox
                text={data?.length}
                bottomText={"Total Orders"}
                IconColor="bg-[#F2F2F2]"
              />
              <DashboardBox
                text={statusCounts?.C || 0}
                bottomText={"Completed Orders"}
                IconColor="bg-[#F5EAFF]"
              />
              <DashboardBox
                text={statusCounts?.P || 0}
                bottomText={"Ongoing Orders"}
                IconColor="bg-[#E6FFE6]"
              />
              <DashboardBox
                text={statusCounts?.X || 0}
                bottomText={"Cancelled Orders"}
                IconColor="bg-[#F9F9CC]"
              />
            </div>
          )
          }
          <div className="flex justify-between mt-[10px] ">
            <div className="w-[100%]">
              <div className="bg-[#ffffff] w-[100%] py-[16px]">
              <div className="container mx-auto py-8">
                <div className="overflow-x-auto">
                  {loading ?(
                    <div className="w-full flex justify-center my-[20px] items-center h-auto"><MoonLoader /></div>
                  )
                   :(
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
                                  {order.orderitems.slice(0, 2).map((item, index) => (
                                    <p key={index}>{item.name}</p>
                                  ))}
                                  {order.orderitems.length > 2 && <small>+ {order.orderitems.length - 2} other items</small>}
                              </div>
                            </div>
                          </td>
                          <td className="py-3 px-6 text-left">
                            <p>{order.buyer.name}</p>
                            <p>{order.buyer.email}</p>
                          </td>
                          <td className="py-3 px-6 text-left">
                            <div className={classNames('flex items-center py-1 px-2 rounded-full', {
                                'bg-[#FEFADD] text-[#E19F38]': order.status === 'P',
                                'bg-[#69F0AE] text-[#004322]': order.status === 'C',
                                'bg-[#AACCFF] text-[#001B43]': order.status === 'S',
                                'bg-[#FFB9B9] text-[#922222]': order.status === 'X',
                              })}>
                              <p>{getStatus(order.status)}</p>
                            </div>
                          </td>
                          <td className="py-3 px-6 text-left">
                            <div className="flex items-center">
                              <p>{formatMoney(order.total_amount, currency)}</p>
                            </div>
                          </td>
                          
                          <td className="py-3 px-6 text-left">
                            <div className="flex items-center">
                              <p>{formatDateOnly(order.created_at)}</p>
                            </div>
                          </td>

                          <td className="py-3 px-6 text-left">
                              <Link className="text-[#000] font-[700] px-3 py-2 bg-[#D9D9D9]" to={'order/'+ order.id}>Details</Link>
                          </td>
                        </tr>
                      ))}
                    </tbody>

                  </table>
                  )

                }
                  
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
