import React, {useEffect} from "react";

import {formatMoney} from "../../utils/nairaFormat";

import { getOrderDetail } from "../../store/features/admin/orderDetails";

import { useDispatch, useSelector } from "react-redux";
import { useParams } from 'react-router-dom';
import Loader from "../../components/common/Loader";
import { formatDate } from "../../utils/nairaFormat";




function MyOrderDetail() {
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

  if(loading){
    return (
    <div className="w-full flex justify-center items-center h-auto"><Loader /></div>)
  }

  return (
    <div className="w-[100%] border-[1px] max-w-[953px] p-[16px] h-[645px] overflow-scroll">
        <div className="flex-auto bg-[#fff] p-3 mb-5 w-full">
            <div className="bg-[#fff] p-3 mb-5 flex justify-between items-center">
              <small>{data?.order_number}</small>
              <small>{formatDate(data?.created_at)}</small>
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
                            {order.name}
                          </td>
                          <td className="py-3 px-6 text-left whitespace-nowrap">
                            <div className="flex items-center">
                              <img
                                src={order?.image}
                                alt={order?.name}
                                className="w-16 h-16 object-cover mr-4"
                              />
                            </div>
                          </td>

                          <td className="py-3 px-6 text-left whitespace-nowrap">
                            {order.quantity}
                          </td>
                          <td className="py-3 px-6 text-left whitespace-nowrap">
                            {formatMoney(order.price)}
                          </td>

                          <td className="py-3 px-6 text-left">
                            <div className="flex items-center">
                              <p>{formatMoney(order.total)}</p>
                            </div>
                          </td>

                        </tr>
                      ))}
                      <tr>
                        <td className="py-3 px-6 text-left whitespace-nowrap">Total</td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td className="py-3 px-6 text-left whitespace-nowrap">{formatMoney(getTotalSum(data?.orderitems))}</td>
                      </tr>
                    </tbody>

                  </table>
                </div>
            </div>
          </div>
    </div>
  );
}

export default MyOrderDetail;
