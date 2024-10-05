import React, {useEffect, useState} from "react";

import Container from "../../ui/Container";
import { Link } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import { listProduct } from "../../store/features/product/listProduct";

function Latest() {

  const dispatch = useDispatch();
  const productState = useSelector((state) => state.listProduct);
  const [latestArriavalImage, setLatestArriavalImage] = useState(null);
  const [featuredProduct, setFeaturedProduct] = useState(null);

  const fetchData = () => {
    dispatch(listProduct())
  }

  useState(() => {
    fetchData()
  }, [])

  const products = productState.data;

  const latestArriaval = products ? products[0] : null;
  const handleFeaturedProduct = () => {
    // navigate to the product page
    const randomIndex = Math.floor(Math.random() * products.length);
    const randomProduct = products[randomIndex];
    setFeaturedProduct(randomProduct);
  };

  useEffect(() =>{
    if(products){
        handleFeaturedProduct()
    }
  }, [products])

  useEffect(() => {
    if (latestArriaval) {
      setLatestArriavalImage(latestArriaval.images[0]);
    }
  }, [latestArriaval]);

  const handleMouseEnterLatestArrival = () => {
    setLatestArriavalImage(latestArriaval.images[1]);
  };

  const handleMouseLeaveLatestArrival = () => {
    setLatestArriavalImage(latestArriaval.images[0]);
  };

  const handleFeaturedProductMouseEnter = () => {
    // select a random product from the list of products
    const randomIndex = Math.floor(Math.random() * products.length);
    const randomProduct = products[randomIndex];
    // set the featured product to the random product
    setFeaturedProduct(randomProduct);
  };

  

  return (
    <Container className="mt-[116px] lg:flex lg:gap-[67px] items-end">
      <div className="lg:w-[40%] w-[100%] p-5">
        <h1 className="text-[#4E0240] xl:text-[2rem] text-[1.25rem] font-[700] lg:mt-[72px]">
          LATEST ARRIVALS
          <br />
          {(new Date().getFullYear())}
        </h1>
        <div className="mt-[30px]">
          {latestArriaval ? 
          <Link to={`/product/${latestArriaval.id}`} onMouseEnter={handleMouseEnterLatestArrival} onMouseLeave={handleMouseLeaveLatestArrival}>
            <img src={latestArriavalImage} className="w-[100%]" alt="" />
          </Link>
          :
          <Link to="/all-products">
            <img src="./images/home/img2.png" className="w-[100%]" alt="" />  
          </Link> 
        }

        </div>
      </div>
      <div className="mt-[30px] lg:w-[60%] w-[100%]">
        {featuredProduct ? 
          <Link to={`/product/${featuredProduct.id}`} onMouseEnter={handleFeaturedProductMouseEnter} onMouseLeave={handleFeaturedProductMouseEnter}>
            <img src={featuredProduct.images[0]} className="w-[100%]" alt="" />
          </Link> : 
          <Link to="/all-products">
            <img src="./images/home/img1.png" className="w-[100%]" alt="" />
          </Link> 
        }
      </div>
    </Container>
  );
}

export default Latest;
