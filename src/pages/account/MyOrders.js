import React from "react";

function MyOrders() {
  const savedItems = [
    { image: "", name: "", orderNo: "", deliveryDate: "" },
    { image: "", name: "", orderNo: "", deliveryDate: "" },
    { image: "", name: "", orderNo: "", deliveryDate: "" },
    { image: "", name: "", orderNo: "", deliveryDate: "" },
  ];
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

      {savedItems.map((items) => (
        <div className="mt-[24px]">
          <div className="flex gap-[29px] items-center">
            <div className="w-[247px] h-[183px]">
              <img
                src="/images/home/img1.png"
                className="w-[100%] h-[100%]"
                alt=""
              />
            </div>
            <div className="flex flex-col gap-[16px]">
              <p>BIKINI SHORT GOWN</p>
              <p>Order no: #103948948459</p>

              <div className="bg-[#E5FFE5] py-[7px] px-[15px]">
                <p className="text-[#008000] text-[0.625rem] font-[700]">
                  DELIVERED ON 23-10
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
