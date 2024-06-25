import React, {useEffect} from "react";
import { useSelector, useDispatch } from "react-redux";
import { getOrder } from "../../store/features/order/getOrder";
import MoonLoader from "react-spinners/MoonLoader";

function MyOrders() {
  const dispatch = useDispatch()
  const {loading, data} = useSelector((store)=> store.getOrder);
  const handleGetOrder = ()=>{
    dispatch(getOrder())
  }



  useEffect(()=>{
    handleGetOrder()
  }, [])

  const savedItems = [
    { image: "", name: "", orderNo: "", deliveryDate: "" },
    { image: "", name: "", orderNo: "", deliveryDate: "" },
    { image: "", name: "", orderNo: "", deliveryDate: "" },
    { image: "", name: "", orderNo: "", deliveryDate: "" },
  ];

  const formatDate = (isoString) => {
    const date = new Date(isoString);
    return date.toLocaleDateString('en-US', {
      weekday: 'short', // e.g., Monday
      year: 'numeric', // e.g., 2024
      month: 'long', // e.g., June
      day: 'numeric' // e.g., 24
    });
  };


  console.log("ORDER DATA: ", data)
  if(loading){

    <div className="w-full h-screen flex justify-center items-center">
          <MoonLoader
          size="60"
          color="#000"
        />
    </div>
  }


  return (
    <div className="w-[100%] border-[1px] max-w-[953px] p-[16px] h-[645px] overflow-scroll">
      <div className="flex gap-[10px]">
        <div className="cursor-pointer">
          <p className="py-[8px] border-b-2">ACTIVE ORDERS</p>
        </div>
        <div className="cursor-pointer">
          <p className="py-[8px]">CANCELLED ORDERS</p>
        </div>
      </div>

      {data?.map((item) => (
        
        <div className="mt-[24px]">
          <div className="flex gap-[29px] items-center">
            <div className="w-[247px] h-[183px]">
              <img
                src={item.orderitems[0]?.image}
                className="w-[60%]"
                alt=""
              />
            </div>
            <div className="flex flex-col gap-[16px]">
              <p>{item.orderitems[0]?.name}</p>
              <p>{item.order_number}</p>
              <small>{formatDate(item.created_at)}</small>

              <div className="bg-[#E5FFE5] py-[7px] px-[15px]">
                <p className="text-[#008000] text-[0.625rem] font-[700]">
                  {item.is_paid ? "PAID" : "PENDING"}
                </p>
              </div>
            </div>

            <div className="ml-[auto] border-[1px] px-[21px] py-[17px]">
              <p className="text-[0.625rem] font-[700]">VIEW DETAILS</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default MyOrders;
