import React, { useEffect, useState } from "react";
import Container from "../../ui/Container";
import ProductCard from "../common/ProductCard";

import {formatMoney} from "../../utils/nairaFormat";

import {listProduct} from "../../store/features/product/listProduct";
import { useDispatch, useSelector } from "react-redux";

import MoonLoader from "react-spinners/MoonLoader"

function Products() {
  const [products, setProducts] = useState([]);

  const dispatch = useDispatch();
  const productState = useSelector((state) => state.listProduct);
  const { data, loading } = productState;

  const fetchData = () => {
    dispatch(listProduct())
  }

  
  useEffect(() => {
    fetchData()
  }, [])
  
  useEffect(() => {
    if (data && data) {
      setProducts(data);
    }
  }, [data]);


  if(loading){
    return <div className="w-full h-screen flex justify-center items-center text-[#4E0240]">

      <MoonLoader
        size="60"
        color="#000"
      />
    </div>
  }
  


  return (
    <Container className="flex lg:flex-row flex-col-reverse gap-[6px] text-[#4E0240]">
      <div className="flex gap-[10px] lg:max-w-[762px] w-[100%] flex-wrap">
        {!loading && (
          <>
            {products?.slice(0, 4).map((product) => (
              <ProductCard 
                id={product.id}
                image={product.image_url}
                title={product.name}
                brand={product.desc.substring(0, 30) + " ..."} 
                price={formatMoney(product.price)}/>
            ))}
          </>
        )}
      </div>

      <div className="flex-1">
        <div className="w-[100%] h-[100%]">
          <img
            src="/images/featured.png"
            className="w-[100%] h-[calc(100%-160px)]"
            alt=""
          />
          <div className="flex justify-between mt-[16px]">
            <div className="flex flex-col gap-[8px] ">
              <p className="text-[1.5rem]">Demin Jeans</p>
              <p className="text-[1.25rem]">Gucci Dress</p>
              <p className="text-[1.25rem]">NGN56,000.00</p>
            </div>
            <div className="flex gap-[6px]">
              <div className="w-[18px] h-[18px] rounded-[50%] bg-[blue]"></div>
              <div className="w-[18px] h-[18px] rounded-[50%] bg-[blue]"></div>
              <div className="w-[18px] h-[18px] rounded-[50%] bg-[blue]"></div>
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
}

export default Products;
