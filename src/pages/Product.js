"use client"
import React, { useState, useEffect } from "react";
import Header from "../components/common/Header";
import Footer from "../components/common/Footer";
import { ToastContainer, toast } from "react-toastify";

import { IoMdHeartEmpty } from "react-icons/io";
import Recommended from "../components/product/Recommended";
import { Link, useParams } from 'react-router-dom';

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
            <div className="lg:w-[50%] mt-[20px] lg:mt-0 flex p-5 ">
              <div className="flex flex-col w-[50px] mr-5 lg:w-[95px]">
                <div className="mb-3 cursor-pointer" >
                  <img src={product.image_url} className="w-[100%] object-contain rounded" />
                </div>
                <div className="mb-3">
                  <img src="/images/product/img1.png" className="w-[100%] object-contain rounded" />
                </div>
                <div className="mb-3">
                  <img src="/images/product/img2.png" className="w-[100%] object-contain rounded" />
                </div>
                <div className="mb-3">
                  <img src="/images/product/img3.png" className="w-[100%] object-contain rounded" />
                </div>
                
              </div>
              <div className="w-[calc(100%-100px)]" >
                <Carousel>
                  {productImages.map((image) => (
                        <img src={image} />
                    ))}
                </Carousel>
              </div>
            </div>

            <div className="lg:w-[50%] mt-[20px] lg:mt-0 text-[#4E0240] p-5">

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
                        <p className="text-[1.5rem] leading-0">{openDesc ? ' - ' : '+'}</p>
                    </div>
                    <p className={`w-[100%] ${openDesc ? 'h-auto' : 'h-[30px]'} transition-all duration-300 overflow-hidden`} >
                      {product.desc}</p>
                  </div>
                  
                  <div className="border-y-[1px] flex flex-col  px-[8px]">
                    <div className="flex justify-between text-[1rem] leading-0 cursor-pointer" onClick={toggleReturnPolicy}> 
                        <b>Delivery & Return</b>
                        <p className="text-[1.5rem] leading-0">{openReturnPolicy ? ' - ' : '+'}</p>
                    </div>
                    <div className={`w-[100%] ${openReturnPolicy ? 'h-auto' : 'h-[30px]'} transition-all duration-300 overflow-hidden`} >
                      <p>We want you to love your purchase! If you are not completely satisfied, you may return your items within <strong>7 days</strong> of receiving your order for a full refund.</p>
                      <hr/><br/>
                      <strong>Return Conditions:</strong><br/>
                      <ol>
                        <li>- Items must be unworn, unwashed, and in their original condition with tags attached.</li>
                        <li>- Sale items are final sale and cannot be returned.</li>
                        <li>- Items returned after 7 days will not be accepted, and refunds may take up to 30 business days to process.</li>
                      </ol><br/>
                      <strong>How to Return an Item:</strong><br/>
                      <ul>
                        <li>1. Contact our customer service team at support@amarae.io to initiate the return process.</li>
                        <li>2. You will receive a return authorization number and instructions on how to return your item(s).</li>
                        <li>3. Pack the item(s) securely in the original packaging, if possible.</li>
                        <li>4. Ship the return package to the address provided by our customer service team.</li>
                      </ul>
                      <br/>
                      <strong>Refunds:</strong>
                      <ul>
                        <li>- Refunds will be processed within 30 business days of receiving the returned item(s).</li>
                        <li>- Refunds will be issued to the original form of payment.</li>
                        <li>- Original shipping charges are non-refundable.</li>
                      </ul>
                      <br/>
                      <strong>Damaged or Defective Items:</strong>
                      <ul>
                        <li>- If you receive a damaged or defective item, please contact our customer service team within 7 days of receipt.</li>
                        <li>- We will arrange for a replacement or refund.</li>
                      </ul>
                      <br/>
                      <strong>Contact Information:</strong>
                      <p>For any questions or concerns regarding returns, please contact us at <Link to="mailto:support@amarae.io">support@amarae.io</Link> or call <Link to="tel:1-800-123-4567">1-800-123-4567</Link>.</p>
                    </div>
                  </div>

                  { data?.variations.length > 0 ? (
                    <>
                      <b>Variation</b>
                      <div className="mt-[32px] flex flex-wrap gap-[5px]">
                      <ul class="grid w-full gap-6 md:grid-cols-4">
                          {data.variations.map((item) =>(
                            <li>
                            <input type="checkbox" id="react-option" value="" class="hidden peer" required="" />
                                <label for="react-option" class="inline-flex items-center justify-between w-full p-2 text-gray-500 bg-white border-2 border-gray-200 rounded-lg cursor-pointer peer-checked:border-blue-600 hover:text-gray-600 peer-checked:text-gray-600 hover:bg-gray-50">                           
                                    <div class="block">
                                        <img src={item.image_url} className="w-[50px] rounded" />
                                        <div class="w-full text-lg font-semibold">{formatMoney(item.price)}</div>
                                        <div class="w-full text-sm">{item.size}</div>
                                    </div>
                                </label>
                            </li>
                          ))}
                      </ul>
                      </div>
                    </>
                  ) : ""}

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
