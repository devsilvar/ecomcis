import React, {useEffect, useState} from "react";
import WelcomeTab from "../../components/admin/WelcomeTab";
import { Link } from "react-router-dom";
import classNames from 'classnames';

import NairaFormat from "../../utils/nairaFormat";
import { getOrderDetail } from "../../store/features/admin/orderDetails";

import { useDispatch, useSelector } from "react-redux";
import { useParams } from 'react-router-dom';
import MoonLoader from "react-spinners/MoonLoader";

import ClipLoader from "react-spinners/ClipLoader";
import { updateOrder } from "../../store/features/admin/updateOrder";


function OrderDetail() {
  const dispatch = useDispatch()
  const { id } = useParams()
  const [orderStatus, setOrderStatus] = useState('')

  const {data, loading} = useSelector((store) => store.getOrderDetail)
  const statusState = useSelector((store) => store.updateOrderStatus)

  const handleGetOrder = ()=>{
    dispatch(getOrderDetail(id))
  }
  
  useEffect(()=>{
    handleGetOrder()
  }, [])

  const updateOrderStatus = (id) => {
    dispatch(updateOrder({ id, data: { status: orderStatus } }));
  }

  const handleStatusChange = (e) =>{
    setOrderStatus(e.target.value)
  }

  const getStatusValue = [
    {
      value: 'P',
      label: 'Pending',
    },
    {
      value: 'C',
      label: 'Completed',
    },
    {
      value: 'S',
      label: 'Shipped',
    },
    {
      value: 'X',
      label: 'Cancelled',
    },
  ]


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

  useEffect(()=>{
    if(data){
      setOrderStatus(data.status)
    }
  }, [data])

  if(loading){
    return (
    <div className="w-full flex justify-center my-[20px] items-center h-auto"><MoonLoader /></div>)
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

              <small className={classNames('py-2 px-3', {
                  'bg-[#FEFADD] text-[#E19F38]': orderStatus === 'P',
                  'bg-[#69F0AE] text-[#004322]': orderStatus === 'C',
                  'bg-[#AACCFF] text-[#001B43]': orderStatus === 'S',
                  'bg-[#FFB9B9] text-[#922222]': orderStatus === 'X',
                })}>{getStatus(data?.status)}</small>
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
                            {NairaFormat.format(order.price)}
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
                        <td className="py-3 px-6 text-left whitespace-nowrap">{NairaFormat.format(data?.total_amount)}</td>
                      </tr>
                    </tbody>

                  </table>
                </div>
            </div>
          </div>

          <div className="flex-auto w-14 flex-col">
            <div className="bg-[#fff] p-3 mb-5">
              <h2>Update Order Status</h2>
              <div className="flex justify-between items-center">
                <select className="bg-[#EDEDED] p-3 mb-5" onChange={handleStatusChange}>
                  {getStatusValue.map(status => (
                    <option 
                        selected={status.value === orderStatus}
                        key={status.value}  
                        value={status.value}>{status.label}</option>
                  ))}
                </select>
                <button 
                  onClick={() => updateOrderStatus(id)}
                  className="bg-[#125491] text-[#fff] p-3 mb-5">
                    {
                      statusState.loading ? <ClipLoader size={10} color="#fff" /> : <span>Update Status</span>

                    }
                    </button>
              </div>
            </div>
            <div className="bg-[#fff] p-3 mb-5">
              <h2>Customer Details</h2>
              <p>{data?.buyer?.name}</p>
              <Link to={'mailto:'+data?.buyer?.email}>{data?.buyer?.email}</Link>
              <p>{data?.buyer?.mobile}</p>
            </div>
            
            <div className="bg-[#fff] p-3 mb-5">
              <h2>Order Address</h2>
              <p>{data?.shipping_address?.apartment_address}</p>
              <p>{data?.shipping_address?.street}</p>
              <p>{data?.shipping_address?.city}</p>
              <p>{data?.shipping_address?.country}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default OrderDetail;
