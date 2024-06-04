import React from "react";

import Container from "../ui/Container";
import Header from "../components/common/Header";
import ProductCard from "../components/common/ProductCard";
import Footer from "../components/common/Footer";

import NairaFormat from "../utils/nairaFormat";

import { useState, useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";
import { listProduct } from "../store/features/product/listProduct";

function AllProducts() {
  const [products, setProducts] = useState([]);
  const dispatch = useDispatch();
  const productState = useSelector((state) => state.listProduct);
  const { data, error, loading } = productState;

  const fetchData = () => {
    dispatch(listProduct())
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
        <Container className="flex ">

          
            <div className="flex gap-[10px]  w-[100%] flex-wrap">
              {loading ? "loading ..." : (
                <>
                  {products?.map((product) => (
                    <ProductCard 
                      id={product.id}
                      image={product.image.substring(13)}
                      title={product.name}
                      brand={product.desc} 
                      price={NairaFormat.format(product.price)}/>
                  ))}
                </>
              )}
            </div>
        </Container>
        <Footer />
    </div>)
}

export default AllProducts;
