import React, {useEffect, useState} from "react";
import Header from "../components/common/Header";
import Latest from "../components/home/Latest";
import Carousel from "../components/home/Carousel";
import Collection from "../components/home/Collection";
import Footer from "../components/common/Footer";
import { Link } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import { listCarousel } from "../store/features/product/listCarousel";

function Home() {
  const dispatch = useDispatch();
  const [imageArray, setImageArray] = useState([]);
  const carouselData = useSelector((state) => state.listCarousel);


  const getCarousel = () => {
    dispatch(listCarousel())
  }

  useEffect(() => {
    getCarousel()
  }, [])

  const { data, error, loading } = carouselData;

  useEffect(() => {
    if (data) {
      const imageUrls = data?.results.map(item => item.image_url);
      setImageArray(imageUrls);
    }
  }, [data]);


  return (
    <div>
      <Header />
      <Link to="/all-products">
        <Carousel imagesArray={
          !loading && imageArray.length > 0 ? imageArray : ["./images/home/slider.png", "./images/home/slider2.jpg", "./images/home/slider3.jpg"]} />
      </Link>
      <Latest />
      <Collection />
      <Footer />
    </div>
  );
}

export default Home;
