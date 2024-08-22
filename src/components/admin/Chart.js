import React, {useEffect, useState} from "react";
import { BarChart } from "@mui/x-charts/BarChart";

import { trendingProduct } from "../../store/features/product/trendingProduct";
import { useDispatch, useSelector } from "react-redux";



function Chart() {
  const dispatch = useDispatch()
  const {data, loading} = useSelector((store)=> store.trendingProduct)

  const handleGetTranding = () =>{
    dispatch(trendingProduct())
  }

  useEffect( () =>{
    handleGetTranding()
  }, [])


  console.log(data)

  const [productNames, setProductNames] = useState([]);
  const [totalSold, setTotalSold] = useState([]);


  useEffect(() => {
    if (data) {
      const names = [];
      const sold = [];
  
      data.forEach(item => {
        names.push(item.product_name);
        sold.push(item.total_sold);
      });
  
      setProductNames(names);
      setTotalSold(sold);
    }
  }, [data]);

  
  return (
    <BarChart
      height={300}
      series={[
        { data: totalSold, label: "Total Sold", id: "uvId", stack: "total" },
      ]}
      xAxis={[{ data: productNames, scaleType: "band" }]}
    />
  );
}

export default Chart;
