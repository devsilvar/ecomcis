"use client"
import React, { useState, useEffect } from "react";
import Header from "../components/common/Header";
import Footer from "../components/common/Footer";
import { ToastContainer, toast } from "react-toastify";

import { IoMdHeartEmpty } from "react-icons/io";
import Recommended from "../components/product/Recommended";
import { useParams } from 'react-router-dom';

import {formatMoney} from "../utils/nairaFormat";
import { getProduct } from "../store/features/product/getProduct";
import { useDispatch, useSelector } from "react-redux";
import { Carousel } from "antd";
// import { Carousel } from "flowbite-react";


import MoonLoader from "react-spinners/MoonLoader"

import { v4 as uuidv4 } from 'uuid';



function Product() {
  const [product, setProduct] = useState({})
  const { id } = useParams();
  const dispatch = useDispatch()
  const [quantity, setQuantity] = useState(1)
  const [productVariation, setProductVariation] = useState([])

  const productState = useSelector((state) => state.getProduct)
  const [productImages, setProductImages] = useState([])

  const fetchData = () => {
    dispatch(getProduct(id))
  }

  let sessionId = localStorage.getItem('sessionId');
    if (!sessionId) {
      sessionId = uuidv4();
      localStorage.setItem('sessionId', sessionId);
    }

  const handleAddToCart = () =>{
    let cart = sessionStorage.getItem('cart')
    if (!cart) {
        cart = [];
    } else {
        cart = JSON.parse(cart);
    }
    let cartProduct = {product: product, quantity: quantity, product_id: product.id}
    cart.push(cartProduct);
    sessionStorage.setItem('cart', JSON.stringify(cart));
    toast.success("Added to cart")
    
    setTimeout(() => {
      window.location.href = "/new-arrivals"
    }, 2000)
  }

  const { data, loading } = productState

  useEffect(() => {
    fetchData()
  }, [])

  useEffect(() => {
    if (data && data) {
      setProduct(data);

      // Create a new array of images starting with the product's image_url
      let images = [data.image_url];

      // Add each variation's image_url to the array
      if (data.variations && data.variations.length > 0) {
        images = images.concat(data.variations.map(variation => variation.image_url));
      }

      // Update the productImages state
      setProductImages(images);
    }

  }, [data]);

  const [openDesc, setOpenDesc] = React.useState(false);
  const [openReturnPolicy, setOpenReturnPolicy] = React.useState(false);

  const toggleDesc = () =>{
    setOpenDesc(!openDesc)
  }

  const toggleReturnPolicy = () =>{
    setOpenReturnPolicy(!openReturnPolicy)
  }


  return (
    <div>
      <Header />
      <ToastContainer />

      {loading ? (
        <div className="w-full h-screen flex justify-center items-center">
            <MoonLoader
            size="60"
            color="#000"
          />
      </div>) : (
        <>
          <div className="flex lg:flex-row flex-col">
            <div className="lg:w-[50%] mt-[20px] lg:mt-0">
              <Carousel className="w-[100%]" >
                {productImages.map((image) => (
                      <img src={image} />
                  ))}
              </Carousel>
            </div>

            <div className="lg:w-[50%] mt-[20px] lg:mt-0 text-[#4E0240]">

              {/* PRODUCT DESCRIPTION */}
              <div className="w-[100%] lg:pr-[150px]">
                <div className="px-[24px]">
                  <div>
                    <p className="text-[0.875rem] font-[700]">home / {product.slug}</p>
                    <p className="text-[1.5rem] py-[15px]">
                      {product.name}
                    </p>
                  </div>
                  <div className="border-y-[1px] flex flex-col  px-[8px]">
                    <div className="flex justify-between text-[1rem] leading-0 cursor-pointer" onClick={toggleDesc}> 
                        <b>Description</b>
                        <p className="text-[2rem] leading-0">{openDesc ? ' - ' : '+'}</p>
                    </div>
                    <p className={`w-[100%] ${openDesc ? 'h-auto' : 'h-[30px]'} transition-all duration-300 overflow-hidden`} >
                      {product.desc}</p>
                  </div>
                  
                  <div className="border-y-[1px] flex flex-col  px-[8px]">
                    <div className="flex justify-between text-[1rem] leading-0 cursor-pointer" onClick={toggleReturnPolicy}> 
                        <b>Delivery & Return</b>
                        <p className="text-[2rem] leading-0">{openReturnPolicy ? ' - ' : '+'}</p>
                    </div>
                    <p className={`w-[100%] ${openReturnPolicy ? 'h-auto' : 'h-[30px]'} transition-all duration-300 overflow-hidden`} >
                    Curabitur euismod commodo metus, non faucibus lacus cursus at. Maecenas at dui mi. Mauris tempor massa turpis, sed vestibulum mi convallis in. Donec tincidunt orci vestibulum accumsan maximus. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut sed interdum eros. Ut congue, libero non accumsan imperdiet, dolor ex consectetur nunc, nec accumsan tortor dolor eget odio. Mauris non mauris et nunc dignissim efficitur et id enim. In ut rhoncus massa.</p>
                  </div>

                  <p className="text-[0.75rem] leading-0 mt-[19px]">Variation</p>
                  <div className="mt-[32px] flex flex-wrap gap-[5px]">
                    {/* PRODUCT VARIATION */}
                    {data?.variations ? (
                      data?.variations.map(variation => (
                        <div key={variation.id}  className="flex gap-[5px] bg-[#E0E0E0] p-2 rounded-[10px]">
                          <div className={`w-[30px] h-[30px] rounded-[10px]`} style={{ backgroundColor: variation.color }}></div>
                          <div className="w-[30px] h-[30px] flex items-center justify-center rounded-[10px] bg-[#fff]">
                            <p className="text-[15px]">{variation.size}</p>
                          </div>
                          <div className="h-[30px] text-[1.2em] px-2 flex items-center justify-center rounded-[10px] bg-[#fff]">
                            {formatMoney(variation.price)}
                          </div>
                        </div>
                      ))
                    ) : ''}

                  </div>
                </div>

                <div className="border-t-[1px] mt-[40px] px-[24px]">
                  <p className="text-[0.75rem] leading-0 mt-[19px]">Price</p>
                  <p className="text-[2rem] leading-0 font-[700]">{formatMoney(data?.price)}</p>
                </div>
              </div>
              {/* PRODUCT DESCRIPTION */}

              <div className="mt-[54px] px-[18px] gap-[10px] flex items-center gap-[10px]">
                <button 
                  className="bg-[#4E0240] py-[18px] px-[10px] lg:w-[318px] w-[90%] rounded-[4px] text-[#ffffff]" 
                  onClick={handleAddToCart}
                  >
                    ADD TO CART
                </button>
                <div className="w-[72px] h-[72px] flex items-center justify-center rounded-[50%] bg-[#4E0240] cursor-pointer">
                  <IoMdHeartEmpty className="text-[#fff] text-[42px]" />
                </div>
            </div>
            </div>
          </div>
          <Recommended  category={product.category} product_id={product.id}/>
        </>
      )}

      <Footer />
    </div>
  );
}

export default Product;
