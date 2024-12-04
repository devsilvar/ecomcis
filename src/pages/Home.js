import React, {useEffect, useState} from "react";
import Header from "../components/common/Header";
import Latest from "../components/home/Latest";
import Carousel from "../components/home/Carousel";
import Collection from "../components/home/Collection";
import Footer from "../components/common/Footer";
import { Link } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import { listProduct } from "../store/features/product/listProduct";
import { listCarousel } from "../store/features/product/listCarousel";

function Home() {
  const dispatch = useDispatch();
  const [imageArray, setImageArray] = useState([]);
  const [search, setSearch] = React.useState("");
  const carouselData = useSelector((state) => state.listCarousel);
  const productState = useSelector((state) => state.listProduct);
  const [productStateArray, setProductStateArray] = useState([]);
  const [hasSummerCollection, setHasSummerCollection] = useState(false);
  const [categoryName] = useState("Summer Collection");

  const getCarousel = () => {
    dispatch(listCarousel())
  }

  const handleGetProduct = () => {
    dispatch(listProduct({search}));
  };

  useEffect(() => {
    getCarousel();
    handleGetProduct();
  }, [])

  const { data, loading } = carouselData;

  useEffect(() => {
    if (data) {
      const imageUrls = data?.results.map(item => item.image_url);
      setImageArray(imageUrls);
    }
  }, [data]);

  useEffect(() => {
    if (productState.data) {
      setProductStateArray(productState.data);
    }
  }, [productState.data]);  

  console.log("PRODUCT STATE", productState)

  useEffect(() => {
    const hasCategory = productStateArray?.some(
      (product) => product.category.name === "Summer Collection"
    );
    setHasSummerCollection(hasCategory);
  }, [])


  return (
    <div>
      <Header />
      {hasSummerCollection ? (
        <Link to={"/all-products?category=" + encodeURIComponent(categoryName)}>
          <Carousel imagesArray={
            !loading && imageArray.length > 0 ? imageArray : ["./images/home/slider.png", "./images/home/slider2.jpg", "./images/home/slider3.jpg"]} />
        </Link>

      ) : (
        <div>
          <Carousel imagesArray={
            !loading && imageArray.length > 0 ? imageArray : ["./images/home/slider.png", "./images/home/slider2.jpg", "./images/home/slider3.jpg"]} />
        </div>
      )}
      <Latest />
      <Collection />
      <Footer />
    </div>
  );
}

export default Home;
