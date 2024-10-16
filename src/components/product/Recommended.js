import React, {useState, useEffect} from "react";
import Container from "../../ui/Container";
import ProductCard from "../common/ProductCard";
import { Link } from "react-router-dom";

import { useSelector, useDispatch } from "react-redux";

import {formatMoney} from "../../utils/nairaFormat";
import { useCurrency } from "../../utils/CurrencyProvider";
import { listProduct } from "../../store/features/product/listProduct";

function Recommended({category, product_id}) {
  const dispatch = useDispatch()
  const {data, loading} = useSelector((state) => state.listProduct);
  const {currency, conversionRate} = useCurrency();
  const [search, setSearch] = useState("");

  const fetchData = () => {
    dispatch(listProduct({search}))
  }

  useEffect(() => {
    fetchData()
  }, [])
  
  let recommendedProduct = data?.results?.filter((item) => (item.category === category && item.id !== product_id ))
  

  return (
    <div className="pb-[56px] pt-[40px] mt-[40px] bg-[#F8F8F8]">
      
      {recommendedProduct?.length > 0 && (
      <>
        <p className="text-center text-[32px]">YOU MIGHT BE INTERESTED IN</p>
        <Container className="flex lg:flex-row flex-col-reverse  gap-[6px] pt-[40px]">
          <div className="flex justify-around mx-auto gap-[10px] 750px:flex-row w-[100%]  flex-wrap">

            {recommendedProduct.slice(0, 3).map((item) => (
              <Link to={`/product/${item.id}`}>
              <div className="lg:w-[375px] w-[100%] pb-[30px]">
                <img src={item.image_url} className="w-[100%] lg:h-[460px] " alt="" />
                <div className="flex justify-between mt-[16px]">
                  <div className="flex flex-col gap-[8px] ">
                    <p className="text-[1.5rem]">{item.name}</p>
                    <p className="text-[1.25rem]">{formatMoney(item.price, currency, conversionRate)}</p>
                  </div>
                </div>
              </div>
            </Link>
            ))}

          </div>
        </Container>
      </>
      )}
    </div>
  );
}

export default Recommended;
