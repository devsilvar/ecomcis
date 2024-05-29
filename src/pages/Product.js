import React, { useState, useEffect } from "react";
import Header from "../components/common/Header";
import Footer from "../components/common/Footer";
import { ToastContainer, toast } from "react-toastify";
import Carousel from "../components/product/Carousel";
import { IoMdHeartEmpty } from "react-icons/io";
import ProductDescription from "../components/product/ProductDescription";
import Recommended from "../components/product/Recommended";
import { useParams } from 'react-router-dom';

import { useGetProductByIdQuery } from "../services/productApi"
import { useAddToCartMutation } from "../services/cartApi";

// import { userId } from "../utils/constant";


function Product() {
  const [product, setProduct] = useState({})
  const [payload, setPayload] = useState({})
  let [imageArray, setImageArray] = useState([])
  const { id } = useParams();

  const {
    data: newProduct,
    error: productError,
    isError,
    isLoading,
  } = useGetProductByIdQuery(id)


  const fetchProductById = ()=>{
    if (!isLoading){
      if (!isError){
        setProduct(newProduct);
      }else{
        console.log(productError)
      }
    }
  }

  const [addToCart] = useAddToCartMutation();
  const notify = (msg) => toast(msg);

  const handleAddToCart = (e)=>{
    e.preventDefault();

    addToCart({
      product_id: product.id,
      quantity: 1,
      // user_id: userId,
      user_id: "58c9338c-eda8-4f9f-8da8-f217386babb1",
    })
    .then((res) =>{
      if(res.error){
        console.log(res.error)
        notify("something went wrong")
      }else{
        notify("item added to cart")
      }
    })
  }
  

  console.log("PRODUCT", product)

  useEffect(() => {
    fetchProductById();
  }, [isLoading]);


  console.log(isLoading)
  if (isLoading) {
    return <div className="w-full h-full flex justify-center items-center">
        <div>Loading...</div>; 
      </div>
  }

  // let image = product.image.substring(13)

  console.log(product.image)


  return (
    <div>
      <Header />
      <ToastContainer />
      <div className="flex lg:flex-row flex-col">
        <div className="lg:w-[50%] w-[100%]">
          {/* <Carousel images={imageArray}/> */}
          <div
            style={{ backgroundImage: `url(${product.image?.substring(13)})` }}
            className="w-[calc(100%/3)] h-[100%] relative bg-cover flex-none bg-no-repeat bg-top"
          ></div>
        </div>
        <div className="lg:w-[50%] mt-[20px] lg:mt-0">
          <ProductDescription 
            name={product.name}
            description={product.description}
            slug={product.slug}
            price={product.price}
          />

          <div className="mt-[54px] justify-between flex items-center gap-[10px]">
          <button className="bg-[#242424] py-[18px] lg:w-[518px] w-[100%] rounded-[4px] text-[#ffffff]" onClick={handleAddToCart}>
            ADD TO BAG
          </button>
          <div className="w-[72px] h-[72px] flex items-center justify-center rounded-[50%] bg-[#F2F2F2]">
            <IoMdHeartEmpty className="text-[42px]" />
          </div>
        </div>
        </div>
      </div>
      <Recommended />

      <Footer />
    </div>
  );
}

export default Product;
