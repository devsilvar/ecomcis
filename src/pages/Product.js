import React, { useState, useEffect } from "react";
import Header from "../components/common/Header";
import Footer from "../components/common/Footer";
import { ToastContainer, toast } from "react-toastify";

import { IoMdHeartEmpty } from "react-icons/io";
import ProductDescription from "../components/product/ProductDescription";
import Recommended from "../components/product/Recommended";
import { useParams } from 'react-router-dom';

import {formatMoney} from "../utils/nairaFormat";
import { getProduct } from "../store/features/product/getProduct";
import { useDispatch, useSelector } from "react-redux";

import MoonLoader from "react-spinners/MoonLoader"

import { v4 as uuidv4 } from 'uuid';



function Product() {
  const [product, setProduct] = useState({})

  let [imageArray, setImageArray] = useState([])
  const { id } = useParams();

  // get product by id
  const dispatch = useDispatch()

  const [quantity, setQuantity] = useState(1)

  const productState = useSelector((state) => state.getProduct)
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

    }
  }, [data]);

  const sizes = data?.variations?.map(item => item.size);
  const colors = data?.variations?.map(item => item.color);
  

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
            <div className="lg:w-[50%] w-[100%]">
              {/* <Carousel images={imageArray}/> */}
              <img 
                className="w-[80%] m-[auto]"
                src={product.image?.substring(13)}
              />
              
            </div>
            <div className="lg:w-[50%] mt-[20px] lg:mt-0 text-[#4E0240]">
              <ProductDescription 
                name={product.name}
                description={product.desc}
                slug={product.slug}
                price={formatMoney(product.price)}
                sizes={sizes}
                colors={colors}
                variations={data?.variations}
              />

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
