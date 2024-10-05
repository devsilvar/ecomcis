import React, { useEffect, useState } from "react";
import Container from "../../ui/Container";
import ProductCard from "../common/ProductCard";

import {formatMoney} from "../../utils/nairaFormat";

import {listProduct} from "../../store/features/product/listProduct";
import { useDispatch, useSelector } from "react-redux";

import { useCurrency } from "../../utils/CurrencyProvider";
import Loader from "../common/Loader";

function Products() {
  const { currency, conversionRate } = useCurrency();
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
      <Loader />
    </div>
  }
  


  return (
    <Container className="flex lg:flex-row flex-col-reverse gap-[6px] text-[#4E0240]">
      <div className="flex gap-[10px] mx-auto justify-center w-[100%] flex-wrap">
        {!loading && (
          <>
            {products?.slice(0, 4).map((product) => (
              <ProductCard 
                id={product.id}
                image={product?.images[0]}
                title={product.name}
                brand={product.desc.substring(0, 30) + " ..."} 
                price={formatMoney(product.price, currency, conversionRate)}/>
            ))}
          </>
        )}
      </div>
    </Container>
  );
}

export default Products;
