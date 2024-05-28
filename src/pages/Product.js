import React, { useState, useEffect } from "react";
import Header from "../components/common/Header";
import Footer from "../components/common/Footer";
import Carousel from "../components/product/Carousel";
import ProductDescription from "../components/product/ProductDescription";
import Recommended from "../components/product/Recommended";
import { useParams } from 'react-router-dom';

import { useGetProductByIdQuery } from "../services/productApi"



function Product() {
  const [product, setProduct] = useState({})
  const { id } = useParams();
  console.log("ID::::", id)
  const {
    data: newProduct,
    error: productError,
    isError,
    isLoading,
  } = useGetProductByIdQuery(id)

  const fetchProductById = ()=>{
    if (!isLoading){
      if (isError){
        setProduct(newProduct.results);
      }else{
        console.log(productError)
      }
    }
  }

  console.log("PRODUCT", product)

  useEffect(() => {
    fetchProductById();
  }, [isLoading]);

  return (
    <div>
      <Header />
      <div className="flex lg:flex-row flex-col lg:pr-[150px]">
        <div className="lg:w-[743px] w-[100%]">
          <Carousel />
        </div>
        <div className="flex-1">
          <ProductDescription />
        </div>
      </div>
      <Recommended />

      <Footer />
    </div>
  );
}

export default Product;
