import React, { useState, useEffect } from "react";
import Header from "../components/common/Header";
import Footer from "../components/common/Footer";
import { ToastContainer, toast } from "react-toastify";
import Carousel from "../components/product/Carousel";
import { IoMdHeartEmpty } from "react-icons/io";
import ProductDescription from "../components/product/ProductDescription";
import Recommended from "../components/product/Recommended";
import { useParams } from 'react-router-dom';

import NairaFormat from "../utils/nairaFormat";
import ClipLoader from "react-spinners/ClipLoader";
import { getProduct } from "../store/features/product/getProduct";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../store/features/cart/addToCart";


// import { userId } from "../utils/constant";


function Product() {
  const [product, setProduct] = useState({})

  let [imageArray, setImageArray] = useState([])
  const { id } = useParams();

  // get product by id
  const dispatch = useDispatch()

  const [productId, setProducId] = useState("")
  const [quantity, setQuantity] = useState(1)
  const [colorId, setColorId] = useState("")


  const productState = useSelector((state) => state.getProduct)
  const addToCartState = useSelector((state) => state.addToCart)
  const fetchData = () => {
    dispatch(getProduct(id))
  }

  console.log("add to cart state",addToCartState)

  const payload = {
    product_id: product.id,
    quantity: quantity,

  }

  const handleAddToCart = () =>{
    dispatch(addToCart(payload))
  }

  const { data, error, loading } = productState



  useEffect(() => {
    fetchData()
  }, [])


  useEffect(() => {
    if (data && data) {
      setProduct(data);

    }
  }, [data]);
  

  if (loading) {
    return <div className="w-full h-full flex justify-center items-center">
        <div>Loading...</div>; 
      </div>
  }


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
            onClick={handleAddToCart}
            >
                {addToCartState.loading ? (
                  <ClipLoader
                    size={20}
                    aria-label="Loading Spinner"
                    data-testid="loader"
                    color="#ffffff"
                  />
                ) : (
                  "ADD TO BAG"
                )}

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
