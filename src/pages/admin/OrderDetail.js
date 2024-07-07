import React, {useEffect} from "react";
import WelcomeTab from "../../components/admin/WelcomeTab";

import NairaFormat from "../../utils/nairaFormat";
import { getOrderDetail } from "../../store/features/admin/orderDetails";

import { useDispatch, useSelector } from "react-redux";
import { useParams } from 'react-router-dom';
import MoonLoader from "react-spinners/MoonLoader";


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



function OrderDetail() {
  const dispatch = useDispatch()
  const { id } = useParams()
  const {data, loading} = useSelector((store) => store.getOrderDetail)

  const handleGetOrder = ()=>{
    dispatch(getOrderDetail(id))
  }
  
  useEffect(()=>{
    handleGetOrder()
  }, [])

  const getTotalSum = (orderItems) => {
    return orderItems?.reduce((sum, item) => {
      return sum + parseFloat(item.total);
    }, 0);
  };


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

  if(loading){
    return (
    <div className="w-full flex justify-center items-center h-auto"><MoonLoader /></div>)
  }

  return (
    <div>
      <div className="max-w-[1090px] mx-auto">
        <div className="mx-[24px]">
          <WelcomeTab tabName="Order Detail" />
        </div>
        <div className="flex p-5 gap-2">
          <div className="flex-auto w-64">
            <div className="bg-[#fff] p-3 mb-5 flex justify-between items-center">
              <small>{data?.order_number}</small>

              <small className="py-2 px-3 bg-[#FEFADD] text-[#E19F38]">{getStatus(data?.status)}</small>
              </div>
            <div className="bg-[#fff] p-3 mb-5"> 
              <small>Order Items</small>

              <div className="overflow-x-auto">
                  <table className="min-w-full bg-white border border-gray-300">
                    <thead>
                      <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
                        <th className="py-3 px-6 text-left">Name</th>
                        <th className="py-3 px-6 text-left">Product</th>
                        <th className="py-3 px-6 text-left">Qty.</th>
                        <th className="py-3 px-6 text-left">Price</th>
                        <th className="py-3 px-6 text-left">Total Price</th>
                      </tr>
                    </thead>

                    <tbody className="text-gray-600 text-sm font-light">
                      {data?.orderitems?.map(order => (
                        <tr key={order.id} className="border-b border-gray-200 hover:bg-gray-100">
                          <td className="py-3 px-6 text-left whitespace-nowrap">
                            {order.product_name}
                          </td>
                          <td className="py-3 px-6 text-left whitespace-nowrap">
                            <div className="flex items-center">
                              <img
                                src={order?.product_image}
                                alt={order?.product_name}
                                className="w-16 h-16 object-cover mr-4"
                              />
                            </div>
                          </td>

                          <td className="py-3 px-6 text-left whitespace-nowrap">
                            {order.quantity}
                          </td>
                          <td className="py-3 px-6 text-left whitespace-nowrap">
                            {NairaFormat.format(order.product_price)}
                          </td>

                          <td className="py-3 px-6 text-left">
                            <div className="flex items-center">
                              <p>{NairaFormat.format(order.total)}</p>
                            </div>
                          </td>

                        </tr>
                      ))}
                      <tr>
                        <td className="py-3 px-6 text-left whitespace-nowrap">Total</td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td className="py-3 px-6 text-left whitespace-nowrap">{NairaFormat.format(getTotalSum(data?.orderitems))}</td>
                      </tr>
                    </tbody>

                  </table>
                </div>
            </div>
          </div>

          <div className="flex-auto w-14 flex-col">
            <div className="bg-[#fff] p-3 mb-5">
              <h2>Customer Details</h2>
              <p>{data?.buyer?.full_name}</p>
              <p>{data?.buyer?.email}</p>
              <p>{data?.buyer?.mobile}</p>
            </div>
            
            <div className="bg-[#fff] p-3 mb-5">
              <h2>Order Address</h2>
              <p>Random Address mate</p>
              
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default OrderDetail;
