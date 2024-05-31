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
import { useUserDetailsQuery } from "../services/userApi";

import NairaFormat from "../utils/nairaFormat";

// import { userId } from "../utils/constant";


function Product() {
  const [product, setProduct] = useState({})
  const [userDetail, setUserDetail] = useState({})
  let [imageArray, setImageArray] = useState([])
  const { id } = useParams();

  const {
    data: newProduct,
    error: productError,
    isError,
    isLoading,
  } = useGetProductByIdQuery(id)

  const {
    data: userDetails,
    error: userError,
    isError: userIsError,
    isLoading: userIsLoading,
  } = useUserDetailsQuery()


  const fetchProductById = ()=>{
    if (!isLoading){
      if (!isError){
        setProduct(newProduct);
      }else{
        console.log(productError)
      }
    }
  }

  const fetchUserDetails = ()=>{
    if (!userIsLoading){
      if (!userIsError){
        setUserDetail(userDetails)
      }else{
        console.log(userError)
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
      user_id: "05f75f55-c2fa-49bb-ba2e-6253149395f1",
    })
    .then((res) =>{
      if(res.error){
        console.log("error: ", res.error)
        notify("something went wrong")
      }else{
        notify("item added to cart")
      }
    })
  }
  

  console.log("PRODUCT", product)


  useEffect(() => {
    fetchProductById();
    fetchUserDetails();
  }, [isLoading]);


  console.log(isLoading)
  console.log("USER DETAILS", userDetail)
  if (isLoading) {
    return <div className="w-full h-full flex justify-center items-center">
        <div>Loading...</div>; 
      </div>
  }

  // let image = product.image.substring(13)

  console.log(product)


  return (
    <div>
      <Header />
      <ToastContainer />
      <div className="flex lg:flex-row flex-col">
        <div className="lg:w-[50%] w-[100%]">
          {/* <Carousel images={imageArray}/> */}
          <img 
            className="w-[80%] m-[auto]"
            src={product.image?.substring(13)}
          />
          {/* <div
            style={{ backgroundImage: `url(${product.image?.substring(13)})` }}
            className="w-[76%] h-[100%] relative bg-cover flex-none bg-no-repeat bg-top ml-[-10px] lg:ml-0"
          ></div> */}
        </div>
        <div className="lg:w-[50%] mt-[20px] lg:mt-0">
          <ProductDescription 
            name={product.name}
            description={product.desc}
            slug={product.slug}
            price={NairaFormat.format(product.price)}
          />

          <div className="mt-[54px] justify-between flex items-center gap-[10px]">
          <button 
            className="bg-[#242424] py-[18px] px-[10px] lg:w-[518px] w-[100%] rounded-[4px] text-[#ffffff]" 
            onClick={handleAddToCart}>
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
