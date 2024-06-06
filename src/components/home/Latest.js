import React, {useState} from "react";

import Container from "../../ui/Container";
import { Link } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import { listProduct } from "../../store/features/product/listProduct";

function Latest() {

  const dispatch = useDispatch();
  const productState = useSelector((state) => state.listProduct);

  const fetchData = () => {
    dispatch(listProduct())
  }

  useState(() => {
    fetchData()
  }, [])

  const products = productState.data?.results;

  const latestArriaval = products ? products[0] : null;

  console.log("PRODUCTS: ",products);
  return (
    <Container className="mt-[116px] lg:flex lg:gap-[67px] items-end">
      <div className="lg:w-[40%] w-[100%]">
        <p className="text-[1rem] font-[400]">Latest</p>
        <h1 className="xl:text-[2rem] text-[1.25rem] font-[700] lg:mt-[72px]">
          LATEST ARRIVALS
          <br />
          {(new Date().getFullYear())}
        </h1>
        <div className="mt-[30px]">
          {latestArriaval ? 
          <Link to={`/product/${latestArriaval.id}`}>
            <img src={latestArriaval.image.substring(13)} className="w-[100%]" alt="" />
          </Link>
          : <img src="./images/home/img2.png" className="w-[100%]" alt="" />  
        }

        </div>
      </div>
      <div className="mt-[30px] lg:w-[60%] w-[100%]">
        <img src="./images/home/img1.png" className="w-[100%]" alt="" />
      </div>
    </Container>
  );
}

export default Latest;
