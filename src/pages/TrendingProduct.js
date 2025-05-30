import React from "react";

import Container from "../ui/Container";
import Header from "../components/common/Header";
import ProductCard from "../components/common/ProductCard";
import Footer from "../components/common/Footer";

import Loader from "../components/common/Loader";
import {formatMoney} from "../utils/nairaFormat";
import { useCurrency } from "../utils/CurrencyProvider";

import { useState, useEffect } from "react";


import Filter from "../components/common/Filter";

import { useDispatch, useSelector } from "react-redux";
import { trendingProduct } from "../store/features/product/trendingProduct";

function TrendingProducts() {
  const [products, setProducts] = useState([]);
  const {currency, conversionRate} = useCurrency();
  const dispatch = useDispatch();
  const productState = useSelector((state) => state.listProduct);
  const { data, loading } = productState;
  
  const fetchData = () => {
    dispatch(trendingProduct())
  }

  
  useEffect(() => {
    fetchData()
  }, [])
  
  useEffect(() => {
    if (data && data.results) {
      setProducts(data.results);
    }
  }, [data]);



  return (
    <div>
        <Header />
        <Filter />

        {loading ? (
          <div className="w-full mt-[50px] flex justify-center items-center">

          <Loader/>
        </div>
        ) : (
        <Container className="flex ">
            <div className="flex gap-[10px] mx-auto w-[80%] flex-wrap">
              {loading ? "loading ..." : (
                <>
                  {products?.map((product) => (
                    <ProductCard 
                      id={product.id}
                      image={product.image_url}
                      title={product.name}
                      brand={product.desc?.substring(0, 30) + " ..."} 
                      price={formatMoney(product.price, currency, conversionRate)}/>
                  ))}
                </>
              )}
            </div>
        </Container>
        )}
        <Footer />
    </div>)
}

export default TrendingProducts;
