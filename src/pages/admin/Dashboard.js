import React, { useEffect, useState } from "react";
import WelcomeTab from "../../components/admin/WelcomeTab";
import DashboardBox from "../../ui/admin/dashboard/DashboardBox";
import { RiArrowDropDownLine } from "react-icons/ri";
import CompletedOrderBox from "../../components/admin/CompletedOrderBox";
import clsx from "clsx";
import Chart from "../../components/admin/Chart";
import { getAdminOrders } from "../../store/features/admin/orders";
import { Toaster } from 'react-hot-toast';

import ProductsTables from "../../components/admin/tables/ProductsTables";
import { useDispatch, useSelector } from "react-redux";
import { getDashboardData } from "../../store/features/admin/dashboardFeature";
import ContentLoader from "react-content-loader";
import { trendingProduct } from "../../store/features/product/trendingProduct";
import { formatMoney } from "../../utils/nairaFormat";
import { Link } from "react-router-dom";
import { useCurrency } from "../../utils/CurrencyProvider";
import { calculateTotalAmount } from "../../utils/SumOfCompletedOrder";

function calculateTotal(products) {
  let total = 0;

  products?.forEach(product => {
    if (!Array.isArray(product.variations)) return;

    product.variations?.forEach(variation => {
      const variationPrice = parseFloat(variation.price);

      variation.colors?.forEach(color => {
        color.sizes?.forEach(size => {
          total += variationPrice * size.quantity;
        });
      });
    });
  });
console.log(total.toFixed(2) , "total ofproducts")
  return total?.toFixed(2); // returns a string rounded to 2 decimal places
}



function Dashboard() {
  const [filterOption, setFilterOption] = useState("Latest Orders");
  const [openFilter, setOpenFilter] = useState(false);
  const [completedOrder, setCompletedOrder] = useState([])
   const { currency, conversionRate } = useCurrency();
   const [totalPaidOrders, settotalPaidOrders] = useState(1)
   const [Balance , setBalance] =useState(1)
  const dispatch = useDispatch()
  const {data, loading} = useSelector((store)=> store.dashboardData)
  const {data:productList , loading:productLoading}  = useSelector((state) => state.listProduct);
  const orderState = useSelector((store) => store.getAdminOrder)

  const handleGetDashboardData = ()=>{
    dispatch(getAdminOrders())
    dispatch(getDashboardData())
  }

  const handleTrendingProduct = () =>{
    dispatch(trendingProduct())
  }

  const handleSetFilter = (e) => {
    setFilterOption(e.target.innerText);
    setOpenFilter(false);
  };

    
    useEffect(()=>{
    handleGetDashboardData()
    handleTrendingProduct()
    let remaningBalance = calculateTotal(productList) 
     setBalance(remaningBalance)

  }, [])

  function calculateTotalAmount(orders) {
      if (!Array.isArray(orders)) return 0;
      return orders?.reduce((sum, order) => {
        return sum + (Number(order.total_amount) || 10);
      }, 0);
    }

    useEffect(() => {
      const newArray = orderState?.data?.filter((object) => object.status === "C" && object.is_paid === true);
      settotalPaidOrders(calculateTotalAmount(newArray));
      setCompletedOrder(newArray);
      let remaningBalance = calculateTotal(productList) 
      setBalance(remaningBalance)
 
    }, [orderState.data]);
    

  const MyLoader = () => (
    <ContentLoader viewBox="0 0 380 70">
      <rect x="0" y="0" rx="5" ry="5" width="70" height="70" />
      <rect x="75" y="0" rx="5" ry="5" width="70" height="70" />
      <rect x="150" y="0" rx="5" ry="5" width="70" height="70" />
      <rect x="220" y="0" rx="5" ry="5" width="70" height="70" />
    </ContentLoader>
  )
console.log(productList, "data")
  return (
    <div>
      <Toaster />
      {console.log(data)}
      <div className="max-w-[1090px] mx-auto">
        <div className="mx-[24px] xl:mx-0">
          <WelcomeTab />
          {loading ? <MyLoader /> :
          (
          <div className="mt-[24px] flex gap-[10px] w-[100%] -z-[1]">
         
            <DashboardBox
              topText={"Available Balance"}
              icon={"/images/icons/wallet.svg"}
              text={currency + " " + totalPaidOrders}
              bottomText={"Total Available Balance"}
              IconColor="bg-[#F2F2F2]"
            />
            <DashboardBox
              textColor="text-[#9B51E0]"
              topText={"Available Products"}
              icon={"/images/icons/icon.svg"}
              text={data ? data?.total_available_products : 0}
              bottomText={"Total available Products"}
              IconColor="bg-[#F5EAFF]"
            />
            <DashboardBox
              topText={"Completed Orders"}
              icon={"/images/icons/icon-1.svg"}
              text={data ? data?.total_completed_orders : 0}
              bottomText={"Total completed Orders"}
              IconColor="bg-[#E6FFE6]"
              textColor="text-[#008000]"
            />
                          <DashboardBox
              topText={"Remaining Balance"}
              icon={"/images/icons/wallet.svg"}
              text={formatMoney(Balance, currency, conversionRate)}
              bottomText={"Total Remaining Balance"}
              IconColor="bg-[#F2F2F2]"
            />

            <DashboardBox
              topText={"Ratings"}
              icon={"/images/icons/icon-2.svg"}
              text={data ? data?.average_ratings : 0}
              bottomText={"Average service ratings"}
              IconColor="bg-[#F9F9CC]"
              textColor="text-[#008000]"
            />
          </div>
          )}

          <div className="flex justify-between gap-[16px] mt-[10px] ">
            <div className="w-[100%]">
              <div className="bg-[#ffffff] w-[100%] py-[16px]">
                
                <ProductsTables />
                
              </div>
            </div>
            <div>
              <div className="w-[328px] h-[366px] bg-[#ffffff] rounded-[8px] p-[16px] ">
                <Chart />
              </div>
              <div className="w-[328px] mt-[16px] bg-[#ffffff] rounded-[8px] p-[16px]">
                <div className="flex justify-between">
                  <p className="font-[500]">Completed Orders</p>
                    <Link to="/admin/orders">
                      <div className="text-[#9747FF] flex items-center">
                        <p className="text-[0.875rem] text-nowrap">View All</p>
                        <img src="/images/icons/arrow-up-right.svg" alt="" />
                      </div>
                    </Link>
                </div>

                <div>
                {/* {JSON.stringify(orderState.data, null, 2)} */}
                  {completedOrder?.map((item) => (
                    <CompletedOrderBox 
                      price={formatMoney(item.total_amount, currency)}
                      owner={item.buyer.email}
                      image={item.orderitems[0]?.image}
                      name={item.order_number.substring(13)}
                    />
                  ))}

                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
